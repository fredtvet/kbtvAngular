import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { Timesheet } from 'src/app/shared/models';
import { ApiService } from '../api.service';
import { TimesheetFilter, TimesheetSummary } from 'src/app/shared/interfaces';
import { tap, switchMap, distinctUntilChanged, map, pairwise, startWith, share, shareReplay, skip } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { TimesheetAggregatorService } from '../utility/timesheet-aggregator.service';
import { GroupByTypes } from 'src/app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private uri = "/Timesheets"

  private groupBySubject = new BehaviorSubject<GroupByTypes>(GroupByTypes.Month);
  groupBy$ = this.groupBySubject.asObservable();

  private filterSubject = new BehaviorSubject<TimesheetFilter>(null);
  filter$ = this.filterSubject.asObservable().pipe(map(filter => {return {...filter}}));

  private timesheetSubject = new BehaviorSubject<Timesheet[]>([]);
  timesheets$ = this.timesheetSubject.asObservable().pipe(distinctUntilChanged());

  timesheetSummaries$ = combineLatest(this.timesheets$, this.groupBy$).pipe(
    map(([timesheets, groupBy]) => this.timesheetAggregatorService.groupByType(groupBy, timesheets))
  );

  constructor(
    private apiService: ApiService,
    private timesheetAggregatorService: TimesheetAggregatorService) {
    
    this.filter$.pipe(
      startWith(null), 
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(x => this.timesheetSubject.next([])),
      pairwise(),
      switchMap(([prev, curr]) => this.get$(curr)), tap(console.log))
    .subscribe(t => this.timesheetSubject.next(t)) //populate timesheets every time filter uniquely changes.
  }

  addFilter(filter: TimesheetFilter){
    this.filterSubject.next(filter);
  }

  addGroupBy(type: GroupByTypes){
    this.groupBySubject.next(type);
  }

  getFilter(): TimesheetFilter{
    return {...this.filterSubject.value};
  }

  private get$ = (filter: TimesheetFilter):Observable<Timesheet[]> => {
    let params = new HttpParams();

    if(filter.user) params = params.set('UserName', filter.user.userName);
    else if(filter.userName) params = params.set('UserName', filter.userName);

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
