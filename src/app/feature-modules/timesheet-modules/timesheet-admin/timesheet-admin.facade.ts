import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timesheet, User } from '@core/models';
import { _setFullNameOnUserForeigns } from '@shared-app/helpers/add-full-name-to-user-foreign.helper';
import { _find } from '@shared-app/helpers/array/find.helper';
import { WeekCriteriaFormState } from '@shared/constants/forms/week-criteria-controls.const';
import { GroupByPeriod, TimesheetStatus } from '@shared/enums';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { ComponentStore } from '@state/component.store';
import { Store } from '@state/store';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetSummaryAggregator } from '../shared-timesheet/services/timesheet-summary.aggregator';
import { FetchTimesheetsActionId, FetchTimesheetsStateCommand } from '../shared-timesheet/state/fetch-timesheets.http.effect';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { SetSelectedWeekActionId, SetTimesheetCriteriaActionId } from './component-state-reducers';
import { ComponentStoreState, StoreState } from './store-state';
import { UpdateStatusesActionId, UpdateStatusesStateCommand } from './update-statuses/update-statuses-state-command.interface';

@Injectable()
export class TimesheetAdminFacade {

    users$ = this.store.selectProperty$<User[]>("users");

    get selectedWeekNr(){ return this.componentStore.selectProperty<number>("selectedWeekNr"); } 
    selectedWeekNr$ = this.componentStore.selectProperty$<number>("selectedWeekNr");

    get weekCriteria(){ return this.componentStore.selectProperty<WeekCriteria>("weekCriteria"); } 
    weekCriteria$ = this.componentStore.selectProperty$<WeekCriteria>("weekCriteria");

    weekCriteriaFormState$: Observable<WeekCriteriaFormState> = 
        this.store.selectProperty$<User[]>("users").pipe(map(x => { return { options: {users: x} } }))

    private _weeklySummaries$: Observable<TimesheetSummary[]> = combineLatest([
        this.store.selectProperty$<Timesheet[]>("timesheets"),
        this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria")
    ]).pipe(
        filterRecords(TimesheetFilter), 
        map(x => this.summaryAggregator.groupByType(GroupByPeriod.Week, x.records))
    );

    weeklySummaries$: Observable<TimesheetSummary[]> = 
        combineLatest([this._weeklySummaries$, this.users$]).pipe(
            map(x =>  _setFullNameOnUserForeigns(x[0], x[1]))
        );

    selectedWeekTimesheets$: Observable<Timesheet[]> = combineLatest([
        this.weeklySummaries$,
        this.selectedWeekNr$
    ]).pipe(map(([summaries, weekNr]) => {
        const summary = _find(summaries, weekNr, "weekNr");
        return summary?.timesheets.map(x => { return {...x, fullName: summary.fullName}});
    }))
    
    constructor(
        private summaryAggregator: TimesheetSummaryAggregator,
        private store: Store<StoreState>,
        private componentStore: ComponentStore<ComponentStoreState>
    ){
        this.componentStore.selectProperty$("timesheetCriteria").subscribe(timesheetCriteria => 
            this.store.dispatch(<FetchTimesheetsStateCommand>{actionId: FetchTimesheetsActionId, timesheetCriteria}))
    }
    
    updateCriteria = (weekCriteria: WeekCriteria): void =>       
        this.componentStore.dispatch({ actionId: SetTimesheetCriteriaActionId, weekCriteria })

    updateWeekNr = (weekNr: number | string): void =>       
        this.componentStore.dispatch({ 
            actionId: SetSelectedWeekActionId, 
            weekNr: (typeof weekNr === "number") ? weekNr : parseInt(weekNr)
        })
    
    updateStatuses(ids: string[], status: TimesheetStatus): void{
        if(ids.length == 0) return;
        this.store.dispatch<UpdateStatusesStateCommand>({
            ids, 
            status,
            actionId: UpdateStatusesActionId,
        });      
    }
}