import { Injectable } from '@angular/core';
import { Timesheet, User } from '@core/models';
import { _setFullNameOnUserForeigns } from '@shared-app/helpers/add-full-name-to-user-foreign.helper';
import { _getSummariesByType } from '@shared-timesheet/helpers/get-summaries-by-type.helper';
import { _noEmployersFilter } from '@shared-timesheet/no-employers-filter.helper';
import { FetchTimesheetsAction } from '@shared-timesheet/state/fetch-timesheets.http.effect';
import { WeekCriteriaFormState } from '@shared/constants/forms/week-criteria-controls.const';
import { GroupByPeriod, TimesheetStatus } from '@shared/enums';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { _find } from 'array-helpers';
import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { FetchModelsAction } from 'state-model';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { StoreState } from './store-state';
import { UpdateTimesheetStatusesAction } from './state/update-timesheet-statuses/update-timesheet-statuses.action';
import { SetSelectedWeekAction } from './state/set-selected-week.reducer';
import { SetTimesheetCriteriaAction } from './state/set-timesheet-criteria.reducer';

@Injectable({providedIn: 'any'})
export class TimesheetAdminFacade {

    users$ = this.store.selectProperty$<User[]>("users").pipe(map(_noEmployersFilter));

    get selectedWeekNr(){ return this.store.state.timesheetAdminSelectedWeekNr; } 
    selectedWeekNr$ = this.store.selectProperty$<number>("timesheetAdminSelectedWeekNr");

    get weekCriteria(){ return this.store.state.timesheetAdminWeekCriteria; } 
    weekCriteria$ = this.store.selectProperty$<WeekCriteria>("timesheetAdminWeekCriteria");

    timesheetCriteria$ = this.store.selectProperty$<TimesheetCriteria>("timesheetAdminTimesheetCriteria")

    weekCriteriaFormState$: Observable<WeekCriteriaFormState> = 
        this.users$.pipe(map(x => { return { options: {users: x} } }))

    private _weeklySummaries$ = this.store.select$(['timesheets', 'timesheetAdminTimesheetCriteria']).pipe(
        map(x => <[ImmutableArray<Timesheet>, Immutable<TimesheetCriteria>]> [x.timesheets, x.timesheetAdminTimesheetCriteria]),
        filterRecords(TimesheetFilter), 
        map(x => _getSummariesByType(GroupByPeriod.Week, x.records))
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
    
    constructor(private store: Store<StoreState>){
        this.store.dispatch({type: FetchModelsAction, props: ["users"]})
    }
    
    updateCriteria = (weekCriteria: WeekCriteria): void =>       
        this.store.dispatch(<SetTimesheetCriteriaAction>{ type: SetTimesheetCriteriaAction, weekCriteria })

    updateWeekNr = (weekNr: number | string): void => {  
        weekNr = (typeof weekNr === "number") ? weekNr : parseInt(weekNr);
        this.store.dispatch(<SetSelectedWeekAction>{ type: SetSelectedWeekAction, weekNr })
    }
    
    updateStatuses(ids: string[], status: TimesheetStatus): void{
        if(ids.length == 0) return;
        this.store.dispatch(<UpdateTimesheetStatusesAction>{ type: UpdateTimesheetStatusesAction, ids, status });      
    }
}