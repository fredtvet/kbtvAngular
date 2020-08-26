import { HttpParams } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom, filter, tap, take, distinctUntilChanged, shareReplay, debounceTime } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url';
import { Mission, Timesheet, User } from 'src/app/core/models';
import { ApiService, ArrayHelperService, TimesheetSummaryAggregator, DateTimeService } from 'src/app/core/services';
import { GroupByPeriod, DateRangePresets } from 'src/app/shared-app/enums';
import { TimesheetCriteria, TimesheetSummary } from 'src/app/shared-app/interfaces';
import { TimesheetFilter } from 'src/app/shared/timesheet-filter.model';
import { BaseTimesheetStoreSettings } from './base-timesheet-store-settings.interface';
import { BaseModelStore } from '../base-model.store';
import { BaseTimesheetStoreState } from './base-timesheet-store-state';

export abstract class BaseTimesheetStore<TState extends Required<BaseTimesheetStoreState>> extends BaseModelStore<TState>{
    
    private baseCriteria: TimesheetCriteria;

    users$ = this._propertyWithFetch$<User[]>("users" as any, this.apiService.get(`${ApiUrl.Users}`));

    groupBy$ = this.property$<GroupByPeriod>(this.settings.groupByProp);

    get criteria(){
      return this.getProperty<TimesheetCriteria>(this.settings.criteriaProp) || {};
    } 

    filteredTimesheets$: Observable<Timesheet[]> = 
      this.stateSlice$(["timesheets" as any, this.settings.criteriaProp]).pipe(
            filter(x => x.timesheets != null && x[this.settings.criteriaProp] != null),
            map(state => {
                const filter = new TimesheetFilter(state[this.settings.criteriaProp]);
                return this.arrayHelperService.filter(state.timesheets, (t: Timesheet) => filter.check(t))    
            }),       
        );

    timesheetSummaries$: Observable<TimesheetSummary[]> = 
        combineLatest(
            this.filteredTimesheets$, 
            this.groupBy$,
            this.users$
        ).pipe(
            filter(([timesheets]) => timesheets != null),
            map(([timesheets, groupBy, users]) => {
                let summaries = this.timesheetSummaryAggregator.groupByType(groupBy, timesheets);
                return this.addFullNameToSummaries(summaries, users);
            })
        );

    constructor(
        arrayHelperService: ArrayHelperService,
        apiService: ApiService,
        protected dateTimeService: DateTimeService,
        private timesheetSummaryAggregator: TimesheetSummaryAggregator,
        private settings: BaseTimesheetStoreSettings<TState>) {
            super(arrayHelperService, apiService, {trackStateHistory: true, logStateChanges: true})           
            this._setStateVoid(settings.initialState);
    }

  addCriteria(criteria: TimesheetCriteria){
    if(criteria && criteria.dateRange && criteria.dateRangePreset === undefined )
      criteria.dateRangePreset = DateRangePresets.Custom;
    else if(criteria && criteria.dateRangePreset !== DateRangePresets.Custom)
      criteria.dateRange = this.dateTimeService.getRangeByDateRangePreset(criteria.dateRangePreset);

    let state: Partial<TState> = {};
    state[this.settings.criteriaProp] = criteria as any; 

    const filter = new TimesheetFilter(criteria);

    if(filter.containedIn(this.baseCriteria)) this._setStateVoid(state);
    else {
        this.baseCriteria = criteria;
        this.get$(criteria).pipe(take(1), tap(timesheets => {
            console.log(timesheets.find(x => x.id === 4))
            state.timesheets = this.arrayHelperService.addOrUpdateRange(
                this.getProperty<Timesheet[]>("timesheets" as any), timesheets, "id");
            console.log(state.timesheets.find(x => x.id === 4))
            this._setStateVoid(state);
        })).subscribe()
    }
  }

  addGroupBy(type: GroupByPeriod){
    let state: Partial<TState> = {};
    state[this.settings.groupByProp] = type as any; 
    this._setStateVoid(state);
  }

  get$ = (filter: TimesheetCriteria):Observable<Timesheet[]> => {
    let params = new HttpParams();

    if(filter.userName) params = params.set('UserName', filter.userName);

    if(filter.dateRange){
      if(typeof filter.dateRange[0] !== 'undefined') 
        params = params.set('StartDate', (filter.dateRange[0].getTime()/1000).toString());
      if(typeof filter.dateRange[1] !== 'undefined') 
        params = params.set('EndDate', (filter.dateRange[1].getTime()/1000).toString());     
    }
    if(filter.mission) params = params.set('MissionId', filter.mission.id.toString());

    return this.apiService.get(ApiUrl.Timesheet, params).pipe( 
        withLatestFrom(this.property$<Mission[]>("missions" as any)),
        map(([timesheets, missions]) => this.addMissionToTimesheet(timesheets, missions)),
    );
  }

  private addMissionToTimesheet(timesheets: Timesheet[], missions: Mission[]): Timesheet[]{
    const missions_obj = {}; 
    missions?.forEach(x => missions_obj[x.id] = x); 
    timesheets?.forEach(t => t.mission = missions_obj[t.missionId]);  
    return timesheets;
  }
   
  private addFullNameToSummaries(summaries: TimesheetSummary[], users: User[]): TimesheetSummary[]{
    if(!summaries || !users) return summaries;
    let usersObj = this.arrayHelperService.convertArrayToObject(users, 'userName');

    return summaries.map(s => {
      const user = usersObj[s.userName];
      if(user) s.fullName = user.firstName + ' ' + user.lastName;
      return s;
    })
  }
}