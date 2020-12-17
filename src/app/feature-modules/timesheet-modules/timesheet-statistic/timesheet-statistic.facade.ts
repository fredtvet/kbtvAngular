import { Injectable } from '@angular/core';
import { Timesheet, User } from '@core/models';
import { StateMissions, StateUsers } from '@core/state/global-state.interfaces';
import { Immutable } from '@global/interfaces';
import { _setFullNameOnUserForeigns } from '@shared-app/helpers/add-full-name-to-user-foreign.helper';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { FetchTimesheetsAction } from '@shared-timesheet/state/fetch-timesheets.http.effect';
import { AgGridConfig } from '@shared/components/abstracts/ag-grid-config.interface';
import { TimesheetCriteriaFormState } from '@shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod } from '@shared/enums';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { ComponentStore } from '@state/component.store';
import { Store } from '@state/store';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { TimesheetSummaryAggregator } from '../shared-timesheet/services/timesheet-summary.aggregator';
import { SetTimesheetCriteriaAction } from '../shared-timesheet/state/set-timesheet-criteria.reducer';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { ComponentStoreState, StoreState } from './store-state';
import { SetGroupByAction } from './timesheet-statistic/component-state-reducers';

type Record = Timesheet | TimesheetSummary;

@Injectable()
export class TimesheetStatisticFacade extends WithUnsubscribe() {
     
    criteria$ = this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria");
    get criteria() { return this.componentStore.selectProperty<TimesheetCriteria>("timesheetCriteria") }

    criteriaFormState$: Observable<TimesheetCriteriaFormState> = 
        this.store.select$<StateMissions & StateUsers>(["missions", "users"]).pipe(
            map(state => { return { options: state  } })
        )

    groupBy$ = this.componentStore.selectProperty$<GroupByPeriod>("timesheetGroupBy");

    private filteredTimesheets$ = combineLatest([
        this.store.selectProperty$<Timesheet[]>("timesheets"),
        this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria")
    ]).pipe(filterRecords(TimesheetFilter), map(x => x.records));

    private groupedTimesheets$ = combineLatest([
        this.filteredTimesheets$,
        this.groupBy$
    ]).pipe(map(([timesheets, groupBy]) => {
        return this.summaryAggregator.groupByType(groupBy, timesheets) || timesheets;    
    }));

    tableConfig$: Observable<AgGridConfig<Record>> = combineLatest([
        this.groupedTimesheets$, 
        this.store.selectProperty$<User[]>("users")
    ]).pipe(
        map(x =>  { return { data: _setFullNameOnUserForeigns<Record>(x[0], x[1]) }}
    ));

    constructor(
        private summaryAggregator: TimesheetSummaryAggregator,
        private store: Store<StoreState>,
        private componentStore: ComponentStore<ComponentStoreState>
    ){
        super();
        this.componentStore.selectProperty$("timesheetCriteria").pipe(takeUntil(this.unsubscribe)).subscribe(timesheetCriteria => 
            this.store.dispatch(<FetchTimesheetsAction>{ type: FetchTimesheetsAction, timesheetCriteria }))
    }

    updateCriteria = (timesheetCriteria: Immutable<TimesheetCriteria>): void =>       
        this.componentStore.dispatch(<SetTimesheetCriteriaAction>{ type: SetTimesheetCriteriaAction, timesheetCriteria })

    updateGroupBy = (groupBy: GroupByPeriod): void =>       
        this.componentStore.dispatch(<SetGroupByAction>{ type: SetGroupByAction, groupBy })

}