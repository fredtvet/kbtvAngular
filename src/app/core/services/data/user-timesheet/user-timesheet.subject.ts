import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/shared/models';
import { LocalStorageService } from '../../local-storage.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TimesheetStatus } from 'src/app/shared/enums';
import { DateParams, TimesheetSummary } from 'src/app/shared/interfaces';
import { BaseMissionChildSubject } from '../abstracts/base-mission-child.subject';
import { DateTimeService } from '../../utility/date-time.service';
import { TimesheetAggregatorService } from '../../utility/timesheet-aggregator.service';


@Injectable({
  providedIn: 'root'
})

export class UserTimesheetSubject extends BaseMissionChildSubject<Timesheet> {

  constructor(
    private dateTimeService: DateTimeService,
    private timesheetAggregator: TimesheetAggregatorService,
    localStorageService: LocalStorageService,
    ) { super(localStorageService, 'userTimesheets') }

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

    getByWeekRangeGrouped$(startWeek: number, endWeek: number, year: number, excludeStatus?: TimesheetStatus): Observable<TimesheetSummary[]>{
      return this.data$.pipe(map(t => this.timesheetAggregator.groupByWeekRange(t, startWeek, endWeek, year)))
    }

    getCount$(status: TimesheetStatus = undefined): Observable<number>{
      if(status == undefined) 
        return this.getAll$().pipe(map(arr => arr ? arr.length : undefined));
      else
        return this.getBy$(x => x.status == status).pipe(map(arr => arr ? arr.length : undefined));
    }

}
