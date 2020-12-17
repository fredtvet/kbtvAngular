import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timesheet, User } from '@core/models';
import { _setFullNameOnUserForeigns } from '@shared-app/helpers/add-full-name-to-user-foreign.helper';
import { _find } from '@array/find.helper';
import { WeekCriteriaFormState } from '@shared/constants/forms/week-criteria-controls.const';
import { GroupByPeriod, TimesheetStatus } from '@shared/enums';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { ComponentStore } from '@state/component.store';
import { Store } from '@state/store';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetSummaryAggregator } from '../shared-timesheet/services/timesheet-summary.aggregator';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { ComponentStoreState, StoreState } from './store-state';
import { FetchTimesheetsAction } from '@shared-timesheet/state/fetch-timesheets.http.effect';
import { SetSelectedWeekAction, SetTimesheetCriteriaAction } from './component-state-reducers';
import { UpdateTimesheetStatusesAction } from './update-timesheet-statuses/update-timesheet-statuses.action';
import { Immutable, Maybe } from '@global/interfaces';

@Injectable()
export class TimesheetAdminFacade {

    users$ = this.store.selectProperty$<User[]>("users");

    get selectedWeekNr(){ return this.componentStore.selectProperty<number>("selectedWeekNr"); } 
    selectedWeekNr$ = this.componentStore.selectProperty$<number>("selectedWeekNr");

    get weekCriteria(){ return this.componentStore.selectProperty<WeekCriteria>("weekCriteria"); } 
    weekCriteria$ = this.componentStore.selectProperty$<WeekCriteria>("weekCriteria");

    weekCriteriaFormState$: Observable<WeekCriteriaFormState> = 
        this.store.selectProperty$<User[]>("users").pipe(map(x => { return { options: {users: x} } }))

    private _weeklySummaries$ = combineLatest([
        this.store.selectProperty$<Timesheet[]>("timesheets"),
        this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria")
    ]).pipe(
        filterRecords(TimesheetFilter), 
        map(x => this.summaryAggregator.groupByType(GroupByPeriod.Week, x.records))
    );

    weeklySummaries$ = combineLatest([this._weeklySummaries$, this.users$]).pipe(
        map(x =>  _setFullNameOnUserForeigns<TimesheetSummary>(x[0], x[1]))
    );

    selectedWeekTimesheets$: Observable<Maybe<Immutable<Timesheet>[]>> = combineLatest([
        this.weeklySummaries$,
        this.selectedWeekNr$
    ]).pipe(map(([summaries, weekNr]) => {
        const summary = _find<TimesheetSummary>(summaries, weekNr, "weekNr");
        return summary?.timesheets.map(x => { return <Timesheet> {...x, fullName: summary.fullName}});
    }))
    
    constructor(
        private summaryAggregator: TimesheetSummaryAggregator,
        private store: Store<StoreState>,
        private componentStore: ComponentStore<ComponentStoreState>
    ){
        this.componentStore.selectProperty$("timesheetCriteria").subscribe(timesheetCriteria => 
            this.store.dispatch(<FetchTimesheetsAction>{ type: FetchTimesheetsAction, timesheetCriteria }))
    }
    
    updateCriteria = (weekCriteria: WeekCriteria): void =>       
        this.componentStore.dispatch(<SetTimesheetCriteriaAction>{ type: SetTimesheetCriteriaAction, weekCriteria })

    updateWeekNr = (weekNr: number | string): void => {  
        weekNr = (typeof weekNr === "number") ? weekNr : parseInt(weekNr);
        this.componentStore.dispatch(<SetSelectedWeekAction>{ type: SetSelectedWeekAction, weekNr })
    }
    
    updateStatuses(ids: string[], status: TimesheetStatus): void{
        if(ids.length == 0) return;
        this.store.dispatch(<UpdateTimesheetStatusesAction>{ type: UpdateTimesheetStatusesAction, ids, status });      
    }
}