import { Injectable } from '@angular/core';
import { Mission, Timesheet } from '@core/models';
import { _getWeekOfYear } from '@datetime/get-week-of-year.helper';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
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

    get weekCriteria(){ return this.componentStore.selectProperty<WeekCriteria>("weekCriteria"); } 
    weekCriteria$ = this.componentStore.selectProperty$<WeekCriteria>("weekCriteria");

    private filteredTimesheets$: Observable<Timesheet[]> = combineLatest([
        this.store.selectProperty$<Timesheet[]>("userTimesheets"),
        this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria")
    ]).pipe(filterRecords(TimesheetFilter), map(x => x.records));

    weekDaySummaries$: Observable<{ [key: number]: TimesheetSummary }> = combineLatest([
        this.filteredTimesheets$, 
        this.store.selectProperty$<Mission[]>("missions")
    ]).pipe(
        map(([userTimesheets, missions]) =>  {
            const relationCfg = new GetWithRelationsConfig("userTimesheets", null, ["missions"]);
            const timesheets = _getRangeWithRelations({userTimesheets, missions}, relationCfg);
            const summaries = this.summaryAggregator.groupByType(GroupByPeriod.Day, timesheets);
            return _mapObjectsToWeekdays(summaries, "date")
        })
    );
    
    constructor(
        private summaryAggregator: TimesheetSummaryAggregator,
        private store: Store<StoreState>,
        private componentStore: ComponentStore<ComponentStoreState>,  
    ){}
     
    previousWeek = (): void =>  
        this.componentStore.dispatch(new PreviousWeekAction())
    
    nextWeek = (): void =>       
        this.componentStore.dispatch(new NextWeekAction(this.currentYear, this.currentWeekNr))

    updateCriteria = (weekCriteria: WeekCriteria) => 
        this.componentStore.dispatch(new SetTimesheetCriteriaAction(weekCriteria))
}