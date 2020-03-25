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

    getByUserNameAndWeek$(userName: string, dateParams: DateParams, excludeStatus?: TimesheetStatus): Observable<TimesheetInfo>{
      let date = moment().year(dateParams.year).week(dateParams.weekNr);
      return this.data$.pipe(map(arr => {
        let timesheetInfo = new TimesheetInfo();
        arr.forEach(x => {
          if(x.userName !== userName || x.status == excludeStatus) return false;
          if(!moment(x.startTime).isSame(date, 'week')) return false;
          timesheetInfo.addTimesheet(x);
        });
        return timesheetInfo;
      }))
    }

    getByUserNameAndWeekGrouped$(userName: string, dateParams: DateParams, excludeStatus?: TimesheetStatus): Observable<Timesheet[][]>{
      //console.time('nameAndWeekGrp')
      console.log('xD')
      const date = moment().year(dateParams.year).week(dateParams.weekNr);

      return this.data$.pipe(map(timesheets => {
        const result: Timesheet[][] = [[]]; //Add empty array at index 0
      
        let i: number;
        //Add timesheet info for each weekday for ISO week 1-7
        for(i = 1; i <= 7; i++){ 
          result.push([])
        }
        
        timesheets.forEach(x => {       
          if(x.userName !== userName || x.status == excludeStatus) return false;
          if(!moment(x.startTime).isSame(date, 'week')) return false;
          let weekday = new Date(x.startTime).getDay();
          if(weekday == 0) weekday = 7; //1-7, mon-sun
          result[weekday].push(x);
        });
        return result;
      }))
    }

    getByMomentAndUserName$(date: moment.Moment, userName: string, excludeStatus?: TimesheetStatus): Observable<Timesheet[]>{
      return this.data$.pipe(map(arr => {   
        return arr.filter(x =>  x.userName == userName && x.status !== excludeStatus && this.filterByMoment(x, date, userName));;
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

    private filterByMoment(timesheet: Timesheet, date: moment.Moment, userName: string){
      return moment(timesheet.startTime).isSame(date, 'day');
    }

}
