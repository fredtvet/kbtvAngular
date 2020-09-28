import { HttpParams } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { FilteredResponse } from 'src/app/core/filter/interfaces/filtered-response.interface';
import { GetRangeWithRelationsHelper } from 'src/app/core/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { Mission, Timesheet, User } from 'src/app/core/models';
import { ObservableStoreBase } from 'src/app/core/observable-store/observable-store-base';
import { ApiService } from 'src/app/core/services/api.service';
import { TimesheetSummaryAggregator } from 'src/app/core/services/utility/timesheet-summary.aggregator';
import { BaseModelStore } from 'src/app/core/state/abstracts/base-model.store';
import { _addOrUpdateRange } from 'src/app/shared-app/helpers/array/add-or-update-range.helper';
import { _convertArrayToObject } from 'src/app/shared-app/helpers/array/convert-array-to-object.helper';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { TimesheetFilter } from 'src/app/shared-timesheet/timesheet-filter.model';
import { GroupByPeriod } from 'src/app/shared/enums';
import { TimesheetCriteria } from '../interfaces/timesheet-criteria.interface';
import { TimesheetSummary } from '../interfaces/timesheet-summary.interface';
import { BaseTimesheetStoreSettings } from './base-timesheet-store-settings.interface';
import { BaseTimesheetStoreState } from './base-timesheet-store-state';

export abstract class BaseTimesheetStore<TState extends Required<BaseTimesheetStoreState>> extends BaseModelStore<TState>{
    
    private static baseCriteria: TimesheetCriteria;

    users$ = this.modelProperty$<User[]>("users" as any);

    groupBy$ = this.stateProperty$<GroupByPeriod>(this.settings.groupByProp); 

    criteria$ = this.stateProperty$<TimesheetCriteria>(this.settings.criteriaProp);

    filteredTimesheets$: Observable<FilteredResponse<TimesheetCriteria, Timesheet>> = 
      this.stateSlice$(["timesheets" as any, this.settings.criteriaProp]).pipe(
            filter(x => x.timesheets != null && x[this.settings.criteriaProp] != null),
            map(state => {
              const filter = new TimesheetFilter(state[this.settings.criteriaProp]);
              return {
                criteria: filter.criteria,
                activeCriteriaCount: filter.activeCriteriaCount,
                records: _filter(state.timesheets, (entity) => filter.check(entity))
              }
            }),       
        );

    timesheetSummaries$: Observable<TimesheetSummary[]> = 
        combineLatest([
            this.filteredTimesheets$, 
            this.groupBy$,
            this.users$
        ]).pipe(
            filter(([filtered]) => filtered != null && filtered.records != null),
            map(([filtered, groupBy, users]) => {
                let summaries = this.timesheetSummaryAggregator.groupByType(groupBy, filtered.records);
                return this.addFullNameToSummaries(summaries, users);
            })
        );

    constructor(
        base: ObservableStoreBase,
        apiService: ApiService,         
        private timesheetSummaryAggregator: TimesheetSummaryAggregator,
        private getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
        private settings: BaseTimesheetStoreSettings<TState>) {
            super(base, apiService)           
            this.setState(settings.initialState, null, false);
    }

  addTimesheetCriteria(criteria: TimesheetCriteria){
    let state: Partial<TState> = {};
    state[this.settings.criteriaProp] = criteria as any; 

    const filter = new TimesheetFilter(criteria);

    //If current filter  data is contained in base, dont fetch http dataand use state. 
    if(filter.containedIn(BaseTimesheetStore.baseCriteria)) this.setState(state);
    else {
        BaseTimesheetStore.baseCriteria = criteria;
        this.get$(criteria).pipe(take(1), tap(timesheets => {
            state.timesheets = _addOrUpdateRange(
                this.getStateProperty<Timesheet[]>("timesheets" as any), timesheets, "id");
            this.setState(state, null, false);
        })).subscribe()
    }
  }

  addGroupBy(type: GroupByPeriod){
    let state: Partial<TState> = {};
    state[this.settings.groupByProp] = type as any; 
    this.setState(state);
  }

  get$ = (filter: TimesheetCriteria):Observable<Timesheet[]> => {
    let params = new HttpParams();

    if(filter.userName) params = params.set('UserName', filter.userName);

    if(filter.dateRange){
      if(filter.dateRange[0]) 
        params = params.set('StartDate', (filter.dateRange[0].getTime()).toString());
      if(filter.dateRange[1]) 
        params = params.set('EndDate', (filter.dateRange[1].getTime()).toString());     
    }
    if(filter.mission) params = params.set('MissionId', filter.mission.id.toString());

    return this.apiService.get(ApiUrl.Timesheet, params).pipe( 
        withLatestFrom(this.modelProperty$<Mission[]>("missions" as any)),
        map(([timesheets, missions]) => this.addMissionToTimesheets({timesheets, missions})),
    );
  }

  private addMissionToTimesheets(state: {timesheets: Timesheet[], missions: Mission[]}): Timesheet[]{
    const relationCfg = new GetWithRelationsConfig("timesheets", null, {include:{missions: true}});
    return this.getRangeWithRelationsHelper.get(state, relationCfg);
  }
   
  private addFullNameToSummaries(summaries: TimesheetSummary[], users: User[]): TimesheetSummary[]{
    if(!summaries || !users) return summaries;
    let usersObj = _convertArrayToObject(users, 'userName');

    return summaries.map(s => {
      const user = usersObj[s.userName];
      if(user) s.fullName = user.firstName + ' ' + user.lastName;
      return s;
    })
  }
}