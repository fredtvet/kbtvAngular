import { Injectable } from '@angular/core';
import { Timesheet, TimesheetInfo  } from 'src/app/shared/models';
import { LocalStorageService } from '../services/local-storage.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MissionSubject } from './mission.subject';
import { TimesheetStatus } from 'src/app/shared/enums';
import { DateParams } from 'src/app/shared/interfaces';
import { BaseMissionChildSubject } from './base-mission-child.subject';
import { DateTimeService } from '../services/utility/date-time.service';


@Injectable({
  providedIn: 'root'
})

export class UserTimesheetSubject extends BaseMissionChildSubject<Timesheet> {

  constructor(
    private missionSubject: MissionSubject,
    private dateTimeService: DateTimeService,
    localStorageService: LocalStorageService,
    ) { super(localStorageService, 'timesheets') }

    getWithMission$(id: number): Observable<Timesheet>{
      return super.get$(id).pipe(switchMap(entity => {
        if(entity === undefined) return throwError('Entity not found');
        return this.missionSubject.get$(entity.missionId).pipe(map(x => {
          let e = {...entity};
          e.mission = x;
          return e;
        }))
      }));   
    }

    getByWeek$(dateParams: DateParams, excludeStatus?: TimesheetStatus): Observable<TimesheetInfo>{
      const range = this.dateTimeService.getWeekRangeByDateParams(dateParams);
      return this.data$.pipe(map(arr => {
        let timesheetInfo = new TimesheetInfo();
        arr.forEach(x => {
          if(x.status == excludeStatus) return false;
          let date = new Date(x.startTime);
          if(date >= range[0] && date <= range[1])
            timesheetInfo.addTimesheet(x);     
        });
        return timesheetInfo;
      }))
    }

    getByWeekGrouped$(dateParams: DateParams, excludeStatus?: TimesheetStatus): Observable<Timesheet[][]>{
      const range = this.dateTimeService.getWeekRangeByDateParams(dateParams);
      return this.data$.pipe(map(timesheets => {
        const result: Timesheet[][] = [[]]; //Add empty inital array for index 0

        let i: number;
        //Add timesheet info for each weekday
        for(i = 1; i <= 7; i++){ 
          result.push([])
        }
        
        timesheets.forEach(x => {       
          if(x.status == excludeStatus) return false;
          let date = new Date(x.startTime);
          if(date >= range[0] && date <= range[1]) 
            result[date.getDay()||7].push(x); //1-7, mon-sun              
        });

        return result;
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

    getCount$(status: TimesheetStatus = undefined): Observable<number>{
      if(status == undefined) 
        return this.getAll$().pipe(map(arr => arr.length));
      else
        return this.getBy$(x => x.status == status).pipe(map(arr => arr.length));
    }

}
