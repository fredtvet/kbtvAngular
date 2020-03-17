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

    getByMissionIdWithMission$(missionId: number): Observable<TimesheetInfo>{
      return this.missionSubject.getAll$().pipe(switchMap(missions => {
        return this.getByMissionId$(missionId).pipe(map(arr =>{
          let timesheetInfo = new TimesheetInfo();
          arr.forEach(x => {
            x.mission = missions.find(y => y.id == x.missionId);
            if(x.status == TimesheetStatus.Open)
              timesheetInfo.openTimesheets.push(x);
            else
              timesheetInfo.closedTimesheets.push(x);
          })
          return timesheetInfo;
        }))
      }));
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
      return this.missionSubject.getAll$().pipe(switchMap(missions => {
        return this.getByUserNameAndWeek$(userName, dateParams, status).pipe(map(x => this.groupByDayAndStatus(x, missions)));
      }));
    }

    getByMomentAndUserName$(date: moment.Moment, userName: string, includeMission: boolean = true): Observable<TimesheetInfo>{
      let timesheetInfo = new TimesheetInfo();
   
      if(includeMission)
        return this.missionSubject.getAll$().pipe(switchMap(missions => {
          return this.data$.pipe(map(timesheets => {
            timesheets.forEach(timesheet => {
              if(this.filterByMomentAndUser(timesheet, date, userName)){
                timesheet.mission = missions.find(y => y.id == timesheet.missionId)
                this.addToTimesheetInfo(timesheet, timesheetInfo);
              }
            })
            return timesheetInfo;
          }))
        }))
      else
        return this.data$.pipe(map(arr => {
          arr.forEach(x => {
            if(this.filterByMomentAndUser(x, date, userName)){
              this.addToTimesheetInfo(x, timesheetInfo);
            }
          });
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

    private groupByDayAndStatus(timesheets: Timesheet[], missions: Mission[] = null): TimesheetInfo[]{
      let arr: TimesheetInfo[] = [];
      let i = 0;
      for(i = 0; i <= 7; i++){ //Add timesheet info for each weekday, leave 0 empty for ISO week 1-7
        arr.push(new TimesheetInfo())
      }

      //Group timesheets by weekday using moment, include mission if present
      timesheets.forEach(timesheet => {
        if(missions !== null){
          timesheet.mission = missions.find(y => y.id == timesheet.missionId)
        }
        let weekday = moment(timesheet['startTime']).isoWeekday();
        this.addToTimesheetInfo(timesheet, arr[weekday])
      });

      return arr;
    }

    private addToTimesheetInfo(timesheet: Timesheet, timesheetInfo: TimesheetInfo){
      if(timesheet.status == TimesheetStatus.Open)
        timesheetInfo.openTimesheets.push(timesheet);
      else
        timesheetInfo.closedTimesheets.push(timesheet);
    }

    private filterByMomentAndUser(timesheet: Timesheet, date: moment.Moment, userName: string){
      return moment(timesheet.startTime).isSame(date, 'day') && timesheet.userName == userName
    }

}
