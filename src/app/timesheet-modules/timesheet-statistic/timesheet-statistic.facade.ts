import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Timesheet, User } from 'src/app/core/models';
import { _setFullNameOnUserForeigns } from 'src/app/shared-app/helpers/add-full-name-to-user-foreign.helper';
import { WithUnsubscribe } from 'src/app/shared-app/mixins/with-unsubscribe.mixin';
import { AgGridConfig } from 'src/app/shared/components/abstracts/ag-grid-config.interface';
import { TimesheetCriteriaFormState } from 'src/app/shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod } from 'src/app/shared/enums';
import { filterRecords } from 'src/app/shared/operators/filter-records.operator';
import { ComponentStore } from 'src/app/state/component.store';
import { StateMissions, StateUsers } from 'src/app/state/interfaces';
import { Store } from 'src/app/state/store';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { TimesheetSummaryAggregator } from '../shared-timesheet/services/timesheet-summary.aggregator';
import { FetchTimesheetsActionId, FetchTimesheetsStateCommand } from '../shared-timesheet/state/fetch-timesheets.http.effect';
import { SetTimesheetCriteriaActionId } from '../shared-timesheet/state/set-timesheet-criteria.reducer';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { ComponentStoreState, StoreState } from './store-state';
import { SetGroupByActionId } from './timesheet-statistic/component-state-reducers';

type Record = Timesheet | TimesheetSummary;

@Injectable()
export class TimesheetStatisticFacade extends WithUnsubscribe() {
     
    criteria$ = this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria");
    get criteria(): TimesheetCriteria { return this.componentStore.selectProperty("timesheetCriteria") }

    criteriaFormState$: Observable<TimesheetCriteriaFormState> = 
        this.store.select$(["missions", "users"]).pipe(
            map(state => { return { options: <StateMissions & StateUsers> state  } })
        )

    groupBy$ = this.componentStore.selectProperty$<GroupByPeriod>("timesheetGroupBy");

    private filteredTimesheets$: Observable<Timesheet[]> = combineLatest([
        this.store.selectProperty$<Timesheet[]>("timesheets"),
        this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria")
    ]).pipe( filterRecords(TimesheetFilter), map(x => x.records) );

    private groupedTimesheets$: Observable<Record[]> = combineLatest([
        this.filteredTimesheets$,
        this.groupBy$
    ]).pipe(map(([timesheets, groupBy]) => {
        return  this.summaryAggregator.groupByType(groupBy, timesheets) || timesheets;    
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
            this.store.dispatch(<FetchTimesheetsStateCommand>{actionId: FetchTimesheetsActionId, timesheetCriteria}))
    }

    updateCriteria = (timesheetCriteria: TimesheetCriteria): void =>       
        this.componentStore.dispatch({actionId: SetTimesheetCriteriaActionId, timesheetCriteria})

    updateGroupBy = (groupBy: GroupByPeriod): void =>       
        this.componentStore.dispatch({actionId: SetGroupByActionId, groupBy})

}