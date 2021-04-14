import { SetGroupByAction, SetTimesheetCriteriaAction } from '@actions/timesheet-actions';
import { Injectable } from '@angular/core';
import { Timesheet, User } from '@core/models';
import { StateMissions, StateUsers } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { _setFullNameOnUserForeigns } from '@shared-app/helpers/add-full-name-to-user-foreign.helper';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { _getSummariesByType } from '@shared-timesheet/helpers/get-summaries-by-type.helper';
import { _noEmployersFilter } from '@shared-timesheet/no-employers-filter.helper';
import { AgGridConfig } from '@shared/components/abstracts/ag-grid-config.interface';
import { TimesheetCriteriaFormState } from '@shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod } from '@shared/enums';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { Immutable, ImmutableArray, Prop } from 'global-types';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from 'state-management';
import { FetchModelsAction } from 'state-model';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { StoreState } from './state/store-state';

type ValidRecord = Timesheet | TimesheetSummary;

@Injectable({providedIn: "any"})
export class TimesheetStatisticFacade extends WithUnsubscribe() {

    criteria$ = this.store.selectProperty$<TimesheetCriteria>("timesheetStatisticTimesheetCriteria");
    get criteria() { return this.store.state.timesheetStatisticTimesheetCriteria }

    criteriaFormState$: Observable<TimesheetCriteriaFormState> = 
        this.store.select$<StateMissions & StateUsers>(["missions", "users"]).pipe(
            map(state => { return { 
                options: {...state, users: _noEmployersFilter(state.users) }
            }})
        )

    groupBy$ = this.store.selectProperty$<GroupByPeriod>("timesheetStatisticGroupBy");

    isFetching$: Observable<boolean> = 
        this.store.selectProperty$<Record<Prop<ModelState>, boolean>>('isFetching').pipe(
            map(x => x && x.timesheets), distinctUntilChanged())

    private filteredTimesheets$ = this.store.select$(['timesheets', 'timesheetStatisticTimesheetCriteria']).pipe(
        map(x => <[ImmutableArray<Timesheet>, Immutable<TimesheetCriteria>]> [x.timesheets, x.timesheetStatisticTimesheetCriteria]),
        filterRecords(TimesheetFilter), 
        map(x => x.records));

    private groupedTimesheets$ = combineLatest([
        this.filteredTimesheets$,
        this.groupBy$
    ]).pipe(map(([timesheets, groupBy]) => {
        return _getSummariesByType(groupBy, timesheets) || timesheets;    
    }));

    tableConfig$: Observable<AgGridConfig<ValidRecord>> = combineLatest([
        this.groupedTimesheets$, 
        this.store.selectProperty$<User[]>("users")
    ]).pipe(
        map(x =>  { return { data: _setFullNameOnUserForeigns<ValidRecord>(x[0], x[1]) }}
    ));

    constructor(private store: Store<StoreState>){
        super();
        this.store.dispatch({type: FetchModelsAction, props: ["users"]})
    }

    updateCriteria = (timesheetCriteria: Immutable<TimesheetCriteria>): void =>       
        this.store.dispatch(<SetTimesheetCriteriaAction<StoreState>>{ type: SetTimesheetCriteriaAction, 
            timesheetCriteria, criteriaProp: "timesheetStatisticTimesheetCriteria" })

    updateGroupBy = (groupBy: GroupByPeriod): void =>       
        this.store.dispatch(<SetGroupByAction>{ type: SetGroupByAction, groupBy })

}