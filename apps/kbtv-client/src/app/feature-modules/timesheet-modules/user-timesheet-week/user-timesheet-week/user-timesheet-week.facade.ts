import { Injectable } from '@angular/core';
import { Timesheet, UserTimesheet } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _mapObjectsToWeekdays } from '@shared-app/helpers/object/map-objects-to-weekdays.helper';
import { _getSummariesByType } from '@shared-timesheet/helpers/get-summaries-by-type.helper';
import { WeekCriteria } from '@shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetFilter } from '@shared-timesheet/timesheet-filter/timesheet-filter.model';
import { GroupByPeriod } from '@shared-app/enums/group-by-period.enum';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { WeekYear, _getWeekYear } from 'date-time-helpers';
import { Immutable, Maybe } from 'global-types';
import { RelationInclude, _getModels } from 'model/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentStore, Store } from 'state-management';
import { TimesheetSummary } from '../../shared-timesheet/interfaces';
import { ComponentStoreState, StoreState } from '../store-state.interface';
import { NextWeekAction, PreviousWeekAction, SetTimesheetCriteriaAction } from './component.reducers';

@Injectable()
export class UserTimesheetWeekFacade {

    private currWeekYear: WeekYear = _getWeekYear();

    get weekCriteria(){ return this.componentStore.state.weekCriteria; } 
    weekCriteria$ = this.componentStore.selectProperty$("weekCriteria");

    private filteredTimesheets$: Observable<Maybe<Immutable<Timesheet>[]>> = combineLatest([
        this.store.selectProperty$("userTimesheets"),
        this.componentStore.selectProperty$("timesheetCriteria")
    ]).pipe(filterRecords(TimesheetFilter), map(x => x.records));

    weekDaySummaries$: Observable<Maybe<{ [key: number]: Immutable<TimesheetSummary> }>> = combineLatest([
        this.filteredTimesheets$, 
        this.store.selectProperty$("missions")
    ]).pipe(
        map(([userTimesheets, missions]) =>  {
            if(!userTimesheets?.length) return;
            const cfg: RelationInclude<ModelState, UserTimesheet> = {prop: "userTimesheets", foreigns: ["mission"]}; 
            const timesheets = _getModels<ModelState, UserTimesheet>({userTimesheets, missions: missions || []}, cfg);
            const summaries = _getSummariesByType(GroupByPeriod.Day, timesheets);
            return _mapObjectsToWeekdays<TimesheetSummary>(summaries, "date")
        }),
    );
    
    constructor(
        private store: Store<StoreState>,
        private componentStore: ComponentStore<ComponentStoreState>,  
    ){ }
     
    previousWeek = (): void =>  
        this.componentStore.dispatch(<PreviousWeekAction>{ type: PreviousWeekAction })
    
    nextWeek = (): void =>       
        this.componentStore.dispatch(<NextWeekAction>{ 
            type: NextWeekAction, 
            currYear: this.currWeekYear.year, 
            currWeekNr: this.currWeekYear.weekNr
        })

    updateCriteria = (weekCriteria: Partial<WeekCriteria>) => 
        this.componentStore.dispatch(<SetTimesheetCriteriaAction>{ type: SetTimesheetCriteriaAction, weekCriteria })
}