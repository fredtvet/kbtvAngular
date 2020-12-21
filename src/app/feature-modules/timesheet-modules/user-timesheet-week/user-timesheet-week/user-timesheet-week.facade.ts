import { Injectable } from '@angular/core';
import { Mission, Timesheet } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _getWeekOfYear } from '@datetime/get-week-of-year.helper';
import { Immutable, Maybe } from '@global/interfaces';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { RelationInclude } from '@model/interfaces';
import { _mapObjectsToWeekdays } from '@shared-app/helpers/object/map-objects-to-weekdays.helper';
import { WeekCriteria } from '@shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetSummaryAggregator } from '@shared-timesheet/services/timesheet-summary.aggregator';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '@shared-timesheet/timesheet-filter/timesheet-filter.model';
import { GroupByPeriod } from '@shared/enums';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { ComponentStore } from '@state/component.store';
import { Store } from '@state/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimesheetSummary } from '../../shared-timesheet/interfaces';
import { ComponentStoreState, StoreState } from '../store-state.interface';
import { NextWeekAction, PreviousWeekAction, SetTimesheetCriteriaAction } from './component.reducers';

@Injectable()
export class UserTimesheetWeekFacade {

    private currentWeekNr: number = _getWeekOfYear();
    private currentYear: number = new Date().getFullYear();

    get weekCriteria(){ return this.componentStore.state.weekCriteria; } 
    weekCriteria$ = this.componentStore.selectProperty$<WeekCriteria>("weekCriteria");

    private filteredTimesheets$: Observable<Maybe<Immutable<Timesheet>[]>> = combineLatest([
        this.store.selectProperty$<Timesheet[]>("userTimesheets"),
        this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria")
    ]).pipe(filterRecords(TimesheetFilter), map(x => x.records));

    weekDaySummaries$: Observable<Maybe<{ [key: number]: Immutable<TimesheetSummary> }>> = combineLatest([
        this.filteredTimesheets$, 
        this.store.selectProperty$<Mission[]>("missions")
    ]).pipe(
        map(([userTimesheets, missions]) =>  {
            if(!userTimesheets?.length) return;
            const cfg: RelationInclude<ModelState> = {prop: "userTimesheets", foreigns: ["missions"]}; 
            const timesheets = _getRangeWithRelations<Timesheet, ModelState>({userTimesheets, missions: missions || []}, cfg);
            const summaries = this.summaryAggregator.groupByType(GroupByPeriod.Day, timesheets);
            return _mapObjectsToWeekdays<TimesheetSummary>(summaries, "date")
        })
    );
    
    constructor(
        private summaryAggregator: TimesheetSummaryAggregator,
        private store: Store<StoreState>,
        private componentStore: ComponentStore<ComponentStoreState>,  
    ){}
     
    previousWeek = (): void =>  
        this.componentStore.dispatch(<PreviousWeekAction>{ type: PreviousWeekAction })
    
    nextWeek = (): void =>       
        this.componentStore.dispatch(<NextWeekAction>{ 
            type: NextWeekAction, 
            currYear: this.currentYear, 
            currWeekNr: this.currentWeekNr 
        })

    updateCriteria = (weekCriteria: WeekCriteria) => 
        this.componentStore.dispatch(<SetTimesheetCriteriaAction>{ type: SetTimesheetCriteriaAction, weekCriteria })
}