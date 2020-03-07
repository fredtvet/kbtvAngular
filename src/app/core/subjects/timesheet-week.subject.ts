import { Injectable } from '@angular/core';
import { TimesheetWeek, Timesheet } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { LocalStorageService } from '../services/local-storage.service';
import { map, mergeMap, concatMap, mapTo } from 'rxjs/operators';
import { Observable, forkJoin, throwError } from 'rxjs';
import { TimesheetStatus } from 'src/app/shared/timesheet-status.enum';
import { TimesheetSubject } from './timesheet.subject';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class TimesheetWeekSubject extends BaseSubject<TimesheetWeek> {
  constructor(
    private timesheetSubject: TimesheetSubject,
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'timesheetWeeks'); }

    getByUserName$(userName: string): Observable<TimesheetWeek[]>{
      return super.getByProperty('userName', userName);
    }

    getByUserNameAndYear$(userName: string, year: number): Observable<TimesheetWeek[]>{
      return this.getAll$()
      .pipe(map(arr => arr.filter(e => e.userName == userName && e.year == year)));
    }

    getDetailsByUserNameAndWeek$(userName: string, weekNr: number, year: number): Observable<TimesheetWeek>{
      return this.data$.pipe(
        concatMap(arr => {
          let week = arr.find(e => e.userName == userName && e.year == year && e.weekNr == weekNr);
          if(week === undefined) week = new TimesheetWeek();
          return this.timesheetSubject.getByWeekId$(week.id).pipe(
            map(timesheets => {week.timesheets = this.groupByDay(timesheets); return week})
          );
        }));
    }

    changeStatus(id: number, status: TimesheetStatus): void{
      this.dataSubject.next(
        this.dataSubject.value.map(e => {
          if(e.id == id) e.status = status;
          return e;
        })
      );
    }

    private groupByDay(timesheets: Timesheet[]){
      //Initalize empty arrays for each weekday
      let arr = [[], [], [], [], [], [], []];
      //Group timesheets by weekday using moment
      timesheets.forEach(timesheet => arr[moment(timesheet['startTime']).day()].push(timesheet));
      return arr;
    }
}
