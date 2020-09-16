import { HttpParams } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission, Timesheet, User } from 'src/app/core/models';
import { ApiService, ArrayHelperService, DateTimeService, TimesheetSummaryAggregator } from 'src/app/core/services';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { TimesheetFilter } from 'src/app/shared-timesheet/timesheet-filter.model';
import { BaseTimesheetStoreSettings } from './base-timesheet-store-settings.interface';
import { BaseTimesheetStoreState } from './base-timesheet-store-state';
import { BaseModelStore } from 'src/app/core/state/abstracts/base-model.store';
import { TimesheetCriteria } from '../interfaces/timesheet-criteria.interface';
import { TimesheetSummary } from '../interfaces/timesheet-summary.interface';
import { GetRangeWithRelationsHelper } from 'src/app/core/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { FilterStateHelper } from 'src/app/core/services/filter';

export abstract class BaseTimesheetStore<TState extends Required<BaseTimesheetStoreState>> extends BaseModelStore<TState>{
    
    private static baseCriteria: TimesheetCriteria;

    users$ = this.modelProperty$<User[]>("users" as any);

    groupBy$ = this.property$<GroupByPeriod>(this.settings.groupByProp); 

    filteredTimesheets$: Observable<Timesheet[]> = 
      this.stateSlice$(["timesheets" as any, this.settings.criteriaProp]).pipe(
            filter(x => x.timesheets != null && x[this.settings.criteriaProp] != null),
            map(state => 
              this.filterStateHelper.filter<Timesheet, TimesheetCriteria>(state.timesheets, state[this.settings.criteriaProp], TimesheetFilter)
            ),       
        );

    timesheetSummaries$: Observable<TimesheetSummary[]> = 
        combineLatest([
            this.filteredTimesheets$, 
            this.groupBy$,
            this.users$
        ]).pipe(
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
        private getRangeWithRelationsHelper: GetRangeWithRelationsHelper<TState>,
        private filterStateHelper: FilterStateHelper,
        private settings: BaseTimesheetStoreSettings<TState>) {
            super(arrayHelperService, apiService)           
            this._setStateVoid(settings.initialState);
    }

  addTimesheetCriteria(criteria: TimesheetCriteria){
    let state: Partial<TState> = {};
    state[this.settings.criteriaProp] = criteria as any; 

    const filter = new TimesheetFilter(criteria);

    //If current filter  data is contained in base, dont fetch http dataand use state. 
    if(filter.containedIn(BaseTimesheetStore.baseCriteria)) this._setStateVoid(state);
    else {
       console.log(BaseTimesheetStore.baseCriteria, criteria)
        BaseTimesheetStore.baseCriteria = criteria;
        this.get$(criteria).pipe(take(1), tap(timesheets => {
            state.timesheets = this.arrayHelperService.addOrUpdateRange(
                this.getStateProperty<Timesheet[]>("timesheets" as any), timesheets, "id");
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
        withLatestFrom(this.modelProperty$<Mission[]>("missions" as any)),
        map(([timesheets, missions]) => this.addMissionToTimesheets({timesheets, missions})),
    );
  }

  private addMissionToTimesheets(state: {timesheets: Timesheet[], missions: Mission[]}): Timesheet[]{
    const relationCfg = new GetWithRelationsConfig("timesheets", null, {include:{mission: true}});
    return this.getRangeWithRelationsHelper.get(state, relationCfg);
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