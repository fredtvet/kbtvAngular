import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { Timesheet, User } from 'src/app/core/models';
import { ApiService } from '../api.service';
import { TimesheetFilter, TimesheetSummary } from 'src/app/shared-app/interfaces';
import { tap, switchMap, distinctUntilChanged, map, withLatestFrom, filter } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { TimesheetAggregatorService } from '../utility/timesheet-aggregator.service';
import { GroupByTypes, TimesheetStatus, Notifications } from 'src/app/shared-app/enums';
import { DeviceInfoService } from '../device-info.service';
import { NotificationService } from '../ui/notification.service';
import { UserService } from './user/user.service';
import { MissionService } from './mission/mission.service';
import { ArrayHelperService } from '../utility/array-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private uri = "/Timesheets"
  private isOnline: boolean;

  private groupBySubject = new BehaviorSubject<GroupByTypes>(GroupByTypes.Month);
  groupBy$ = this.groupBySubject.asObservable();

  private filterSubject = new BehaviorSubject<TimesheetFilter>(undefined);
  filter$ = this.filterSubject.asObservable().pipe(map(filter => {return {...filter}}));

  private timesheetSubject = new BehaviorSubject<Timesheet[]>([]);
  timesheets$ = this.timesheetSubject.asObservable()

  timesheetSummaries$ = combineLatest(this.timesheets$, this.groupBy$, this.userService.getAll$()).pipe(
    map(([timesheets, groupBy, users]) => {
      let summaries = this.timesheetAggregatorService.groupByType(groupBy, timesheets);
      return this.addFullNameToSummaries(summaries, users);
    })
  );

  constructor(
    private arrayHelperService: ArrayHelperService,
    private apiService: ApiService,
    private timesheetAggregatorService: TimesheetAggregatorService,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
    private userService: UserService,
    private missionService: MissionService) {
    this.deviceInfoService.isOnline$.subscribe(res =>this.isOnline = res)

    this.filterSubject.pipe(
      filter(x => x !== undefined),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(x => this.timesheetSubject.next([])),
      switchMap(this.get$),
      withLatestFrom(this.missionService.getAll$()),
      map(([timesheets, missions]) => {
        const missions_obj = {}; 
        missions.forEach(x => missions_obj[x.id] = x); 
        timesheets.forEach(t => t.mission = missions_obj[t.missionId]);
        return timesheets;
      })
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
      .pipe(tap(this.addOrUpdateRange));
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
    let arr = this.arrayHelperService.update(this.timesheetSubject.value, timesheet, 'id');
    this.timesheetSubject.next(arr);
  }

  private addOrUpdateRange = (timesheets: Timesheet[]) => {
    let arr = this.arrayHelperService.addOrUpdateRange(this.timesheetSubject.value, timesheets, 'id');
    this.timesheetSubject.next(arr);
  }

  private addFullNameToSummaries(summaries: TimesheetSummary[], users: User[]){
    let usersObj = this.arrayHelperService.convertArrayToObject(users, 'userName');
    let ts = summaries.map(s => {
      const user = usersObj[s.userName];
      if(user) s.fullName = user.firstName + ' ' + user.lastName;
      return s;
    })
    return ts;
  }

}
