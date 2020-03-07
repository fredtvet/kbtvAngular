import { Injectable } from '@angular/core';
import { Employer, Timesheet  } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { LocalStorageService } from '../services/local-storage.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { TimesheetStatus } from 'src/app/shared/timesheet-status.enum';

@Injectable({
  providedIn: 'root'
})

export class TimesheetSubject extends BaseSubject<Timesheet> {
  constructor(
    localStorageService: LocalStorageService,
    ) { super(localStorageService, 'timesheets'); }

    getByMissionId$(missionId: number): Observable<Timesheet[]>{
      return super.getByProperty('missionId', missionId);
    }

    getByUserName$(userName: string): Observable<Timesheet[]>{
      return super.getByProperty('userName', userName);
    }

    getByWeekId$(weekId: number){
      return super.getByProperty('timesheetWeekId', weekId);
    }

    getByUserNameAndWeek$(userName: string, weekNr: number, year: number): Observable<Timesheet[]>{
      let date = moment().year(year).week(weekNr);
      return this.data$.pipe(map(arr => arr.filter(x => {
        return moment(x.startTime).isSame(date, 'week') && x.userName == userName;
      })))
    }

    getByMomentAndUserName$(userName: string, year: number, weekNr: number, weekDay: number){
      let date = moment().year(year).week(weekNr).day(weekDay);
      return this.data$.pipe(map(arr => arr.filter(x => {
        return moment(x.startTime).isSame(date, 'day') && x.userName == userName;
      })))
    }

    changeStatuses(ids: number[], status: TimesheetStatus): void{
      this.dataSubject.next(
        this.dataSubject.value.map(d => {
          if(ids.includes(d.id)) d.status = status;
          return d;
        })
      );
    }

}
