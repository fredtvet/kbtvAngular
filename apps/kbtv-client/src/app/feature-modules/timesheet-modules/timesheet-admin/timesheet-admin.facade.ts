import { SetSelectedWeekAction, SetTimesheetCriteriaWithWeekCriteriaAction, UpdateTimesheetStatusesAction } from '@actions/timesheet-actions';
import { Injectable } from '@angular/core';
import { Timesheet, User } from '@core/models';
import { _setFullNameOnUserForeigns } from '@shared-app/helpers/add-full-name-to-user-foreign.helper';
import { _getSummariesByType } from '@shared-timesheet/helpers/get-summaries-by-type.helper';
import { _noEmployersFilter } from '@shared-timesheet/no-employers-filter.helper';
import { WeekCriteriaFormState } from '@shared/constants/forms/week-criteria-controls.const';
import { GroupByPeriod, TimesheetStatus } from '@shared/enums';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { _find } from 'array-helpers';
import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { _getRangeWithRelations } from 'model/core';
import { FetchModelsAction } from 'model/state-fetcher';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetCriteria } from '../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class TimesheetAdminFacade {

    users$ = this.store.selectProperty$("users").pipe(map(_noEmployersFilter));

    get selectedWeekNr(){ return this.store.state.timesheetAdminSelectedWeekNr; } 
    selectedWeekNr$ = this.store.selectProperty$("timesheetAdminSelectedWeekNr");

    get weekCriteria(){ return this.store.state.timesheetAdminWeekCriteria; } 
    weekCriteria$ = this.store.selectProperty$("timesheetAdminWeekCriteria");

    timesheetCriteria$ = this.store.selectProperty$("timesheetAdminTimesheetCriteria")

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
        this.store.select$(['timesheetAdminSelectedWeekNr', 'missions'])
    ]).pipe(map(([summaries, state]) => {
        const summary = _find<TimesheetSummary>(summaries, state.timesheetAdminSelectedWeekNr, "weekNr");
        if(!summary?.timesheets?.length) return;
        let timesheets = _getRangeWithRelations<Timesheet, StoreState>(
            {...state, timesheets: summary.timesheets}, 
            {prop: "timesheets", foreigns: ["missions"]}
        )
        return timesheets?.slice().map(x => { return <Timesheet> {...x, fullName: summary.fullName}});
    }))
    
    constructor(private store: Store<StoreState>){
        this.store.dispatch({type: FetchModelsAction, props: ["users"]})
    }
    
    updateCriteria = (weekCriteria: WeekCriteria): void =>       
        this.store.dispatch(<SetTimesheetCriteriaWithWeekCriteriaAction>{ 
            type: SetTimesheetCriteriaWithWeekCriteriaAction, weekCriteria 
        })

    updateWeekNr = (weekNr: number | string): void => {  
        weekNr = (typeof weekNr === "number") ? weekNr : parseInt(weekNr);
        this.store.dispatch(<SetSelectedWeekAction>{ type: SetSelectedWeekAction, weekNr })
    }
    
    updateStatuses(ids: string[], status: TimesheetStatus): void{
        if(ids.length == 0) return;
        this.store.dispatch(<UpdateTimesheetStatusesAction>{ type: UpdateTimesheetStatusesAction, ids, status });      
    }
}