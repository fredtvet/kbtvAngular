import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Timesheet } from 'src/app/shared/models';
import { ApiService } from '../api.service';
import { TimesheetFilter } from 'src/app/shared/interfaces';
import { tap, switchMap, distinctUntilChanged, skip, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { TimePeriods } from 'src/app/shared/enums';
import { TimesheetAggregatorService } from '../utility/timesheet-aggregator.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private uri = "/Timesheets"

  private groupBySubject = new BehaviorSubject<TimePeriods>(TimePeriods.Month);
  groupBy$ = this.groupBySubject.asObservable();

  private filterSubject = new BehaviorSubject<TimesheetFilter>(undefined);
  filter$ = this.filterSubject.asObservable().pipe(map(filter => {return {...filter}}));

  private timesheetSubject = new BehaviorSubject<Timesheet[]>([]);
  timesheets$ = this.timesheetSubject.asObservable();

  timesheetSummaries$ = combineLatest(this.timesheets$, this.groupBy$).pipe(map(
    ([timesheets, groupBy]) => this.timesheetAggregatorService.groupByTimePeriod(groupBy, timesheets)));

  constructor(
    private apiService: ApiService,
    private timesheetAggregatorService: TimesheetAggregatorService) {
    this.filter$.pipe(
      skip(1),
      distinctUntilChanged(),
      switchMap(this.getTimesheets))
    .subscribe(t => this.timesheetSubject.next(t)) //populate timesheets every time filter uniquely changes.
  }

  addFilter(filter: TimesheetFilter){
    this.filterSubject.next(filter);   
  }

  addGroupBy(period: TimePeriods){
    this.groupBySubject.next(period);
  }

  private getTimesheets = (filter: TimesheetFilter):Observable<Timesheet[]> => {
    let params = new HttpParams();

    if(filter.user) params = params.set('UserName', filter.user.userName);
    if(filter.dateRange){
      if(typeof filter.dateRange[0] !== 'undefined') 
        params = params.set('StartDate', (filter.dateRange[0].getTime()/1000).toString());
      if(typeof filter.dateRange[1] !== 'undefined') 
        params = params.set('EndDate', (filter.dateRange[1].getTime()/1000).toString());     
    }
    if(filter.mission) params = params.set('MissionId', filter.mission.id.toString());

    return this.apiService.get(this.uri, params);
  }

  private hasFilterChanged(filter: TimesheetFilter): boolean{
    return JSON.stringify(filter) !== JSON.stringify(this.filterSubject.value) 
  }

}
