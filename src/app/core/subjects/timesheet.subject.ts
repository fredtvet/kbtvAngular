import { Injectable } from '@angular/core';
import { Employer, Timesheet, TimesheetInfo, Mission  } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { LocalStorageService } from '../services/local-storage.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MissionSubject } from './mission.subject';
import { TimesheetStatus } from 'src/app/shared/enums';
import { DateParams } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class TimesheetSubject extends BaseSubject<Timesheet> {
  constructor(
    localStorageService: LocalStorageService,
    private missionSubject: MissionSubject,
    ) { super(localStorageService, 'timesheets'); }

    getByMissionId$(missionId: number): Observable<Timesheet[]>{
      return super.getByProperty('missionId', missionId);
    }

    getByUserName$(userName: string, groupByWeek: boolean = false): Observable<Timesheet[]>{
      return super.getByProperty('userName', userName);
    }

    getByUserNameAndWeek$(userName: string, dateParams: DateParams, status?: TimesheetStatus): Observable<Timesheet[]>{
      let date = moment().year(dateParams.year).week(dateParams.weekNr);
      return this.data$.pipe(map(arr => arr.filter(x => {
        let exp = moment(x.startTime).isSame(date, 'week') && x.userName == userName;
        if(status != undefined) exp = exp && x.status == status;
        return exp;
      })))
    }

    getByUserNameAndWeekGrouped$(userName: string, dateParams: DateParams, status?: TimesheetStatus): Observable<TimesheetInfo[]>{
      return this.getByUserNameAndWeek$(userName, dateParams, status).pipe(map(this.groupByDayAndStatus));
    }

    getByMomentAndUserName$(date: moment.Moment, userName: string, includeMission: boolean = true): Observable<TimesheetInfo>{
      if(includeMission)
        return this.missionSubject.getAll$().pipe(switchMap(missions => {
          return this.data$.pipe(map(timesheets => {
            let timesheetInfo = this.filterByMomentAndUser(timesheets, date, userName);
            timesheetInfo.openTimesheets = this.includeMission(timesheetInfo.openTimesheets, missions);
            timesheetInfo.closedTimesheets = this.includeMission(timesheetInfo.closedTimesheets, missions);
            return timesheetInfo;
          }))
        }))
      else
        return this.data$.pipe(map(arr => this.filterByMomentAndUser(arr, date, userName)))
    }

    changeStatuses(ids: number[], status: TimesheetStatus): void{
      this.dataSubject.next(
        this.dataSubject.value.map(d => {
          if(ids.includes(d.id)) d.status = status;
          return d;
        })
      );
    }

    private groupByDayAndStatus(timesheets: Timesheet[]): TimesheetInfo[]{
      let arr: TimesheetInfo[] = [];
      let i = 0;
      for(i = 0; i <= 7; i++){ //Add timesheet info for each weekday, leave 0 empty for ISO week 1-7
        arr.push(new TimesheetInfo())
      }

      //Group timesheets by weekday using moment
      timesheets.forEach(timesheet => {
        let weekday = moment(timesheet['startTime']).isoWeekday();
        if(timesheet.status == TimesheetStatus.Open)
          arr[weekday].openTimesheets.push(timesheet);
        else
          arr[weekday].closedTimesheets.push(timesheet);
      });

      return arr;
    }

    private filterByMomentAndUser(timesheets: Timesheet[], date: moment.Moment, userName: string): TimesheetInfo{
      let timesheetInfo = new TimesheetInfo();
      timesheets.forEach(x => {
          if(moment(x.startTime).isSame(date, 'day') && x.userName == userName){
            if(x.status == TimesheetStatus.Open)
              timesheetInfo.openTimesheets.push(x);
            else
              timesheetInfo.closedTimesheets.push(x);
          }
      })
      return timesheetInfo;
    }

    private includeMission(timesheets: Timesheet[], missions: Mission[]): Timesheet[]{
      timesheets.forEach(x => x.mission = missions.find(y => y.id == x.missionId)) //High complexity
      return timesheets;
    }

}
