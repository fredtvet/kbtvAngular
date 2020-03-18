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

    getWithMission$(id: number): Observable<Timesheet>{
      return this.missionSubject.getAll$().pipe(switchMap(missions => {
        return this.get$(id).pipe(map(x => {
          if(x !== undefined)
            x.mission = missions.find(y => y.id == x.missionId);
          return x;
        }))
      }));   
    }

    getByMissionId$(missionId: number): Observable<TimesheetInfo>{
      return super.getByProperty('missionId', missionId)
        .pipe(map(arr =>{
          let timesheetInfo = new TimesheetInfo();
          arr.forEach(x => timesheetInfo.addTimesheet(x));
          return timesheetInfo;
        }))
    }

    getByUserName$(userName: string, groupByWeek: boolean = false): Observable<Timesheet[]>{
      return super.getByProperty('userName', userName);
    }

    getByUserNameAndWeek$(userName: string, dateParams: DateParams, status?: TimesheetStatus): Observable<Timesheet[]>{
      let date = moment().year(dateParams.year).week(dateParams.weekNr);
      return this.data$.pipe(map(arr => arr.filter(x => {
        let exp = moment(x.startTime).isSame(date, 'week') && x.userName == userName;
        if(status == undefined) return exp;
        return exp && x.status == status;
      })))
    }

    getByUserNameAndWeekGrouped$(userName: string, dateParams: DateParams, status?: TimesheetStatus): Observable<TimesheetInfo[]>{
      return this.getByUserNameAndWeek$(userName, dateParams, status).pipe(map(x => this.groupByDayAndStatus(x)));
    }

    getByMomentAndUserName$(date: moment.Moment, userName: string): Observable<TimesheetInfo>{
      return this.data$.pipe(map(arr => {
        let timesheetInfo = new TimesheetInfo();
        arr.forEach(x => {
          if(this.filterByMomentAndUser(x, date, userName)){
            timesheetInfo.addTimesheet(x);
          }
        });
        console.log(timesheetInfo);
        return timesheetInfo;
      }))

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
      //Add timesheet info for each weekday, leave 0 empty for ISO week 1-7
      for(i = 0; i <= 7; i++){ 
        arr.push(new TimesheetInfo())
      }
      //Group timesheets by weekday using moment
      timesheets.forEach(timesheet => {
        let weekday = moment(timesheet['startTime']).isoWeekday();
        arr[weekday].addTimesheet(timesheet);
      });

      return arr;
    }

    private filterByMomentAndUser(timesheet: Timesheet, date: moment.Moment, userName: string){
      return moment(timesheet.startTime).isSame(date, 'day') && timesheet.userName == userName
    }

}
