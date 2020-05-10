import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subject, throwError } from 'rxjs';
import { Timesheet, User } from 'src/app/shared/models';
import { ApiService } from '../../api.service';
import { TimesheetFilter, TimesheetSummary } from 'src/app/shared/interfaces';
import { tap, switchMap, distinctUntilChanged, map, pairwise, startWith, share, shareReplay, skip } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { TimesheetAggregatorService } from '../../utility/timesheet-aggregator.service';
import { GroupByTypes, TimesheetStatus, Notifications } from 'src/app/shared/enums';
import { ConnectionService } from '../../connection.service';
import { NotificationService } from '../../notification.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private uri = "/Timesheets"
  private isOnline: boolean;

  private groupBySubject = new BehaviorSubject<GroupByTypes>(GroupByTypes.Month);
  groupBy$ = this.groupBySubject.asObservable();

  private filterSubject = new BehaviorSubject<TimesheetFilter>(null);
  filter$ = this.filterSubject.asObservable().pipe(map(filter => {return {...filter}}));

  private timesheetSubject = new BehaviorSubject<Timesheet[]>([]);
  timesheets$ = this.timesheetSubject.asObservable();

  timesheetSummaries$ = combineLatest(this.timesheets$, this.groupBy$, this.userService.getAll$()).pipe(
    map(([timesheets, groupBy, users]) => {
      let summaries = this.timesheetAggregatorService.groupByType(groupBy, timesheets);
      return this.addFullNameToSummaries(summaries, users);
    })
  );

  constructor(
    private apiService: ApiService,
    private timesheetAggregatorService: TimesheetAggregatorService,
    private connectionService: ConnectionService,
    private notificationService: NotificationService,
    private userService: UserService) {
    this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)

    this.filter$.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(x => this.timesheetSubject.next([])),
      switchMap(this.get$)
    ).subscribe(t => this.timesheetSubject.next(t))
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

  changeStatus$(id: number, status: TimesheetStatus): Observable<Timesheet>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å oppdatere ting.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService.put(`${this.uri}/${id}/Status`, { id: id, status: status})
      .pipe(tap(this.update));
  }

  changeStatuses$(ids: number[], status: TimesheetStatus): Observable<Timesheet[]>{
    if(!this.isOnline)
      return throwError('Du må være tilkoblet internett for å oppdatere ting.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    if(ids.length == 0) throwError('Ingen ubekreftede timer');

    return this.apiService.put(`${this.uri}/Status`, { ids: ids, status: status})
      .pipe(tap(this.updateRange));
  }


  get$ = (filter: TimesheetFilter):Observable<Timesheet[]> => {
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

  private update = (timesheet: Timesheet) => {
    let arr = [...this.timesheetSubject.value];
    arr = arr.map(e => {
      if(e.id !== timesheet.id) return e;
      else return Object.assign(e, timesheet);
    });
    this.timesheetSubject.next(arr);
  }

  private updateRange = (timesheets: Timesheet[]) => {
    let originals = this.timesheetSubject.value || [];
    originals = [...originals];
    timesheets.forEach(e => {
      let duplicateIndex = originals.findIndex((o) => (o.id === e.id));
      if(duplicateIndex !== -1) originals[duplicateIndex] = Object.assign(originals[duplicateIndex], e);
      else originals.push(e);
    });
    this.timesheetSubject.next(originals);
  }

  private addFullNameToSummaries(summaries: TimesheetSummary[], users: User[]){
    let ts = summaries.map(s => {
      const user = users.find(x => x.userName === s.userName);
      if(user) s.fullName = user.firstName + ' ' + user.lastName;
      return s;
    })
    console.timeEnd('fullname');
    return ts;
  }

}
