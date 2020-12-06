import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Mission, Timesheet } from 'src/app/core/models';
import { _getRangeWithRelations } from 'src/app/model/helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/model/helpers/get-with-relations.config';
import { _find } from 'src/app/shared-app/helpers/array/find.helper';
import { _getWeekOfYear } from 'src/app/shared-app/helpers/datetime/get-week-of-year.helper';
import { _mapObjectsToWeekdays } from 'src/app/shared-app/helpers/object/map-objects-to-weekdays.helper';
import { GroupByPeriod } from 'src/app/shared/enums';
import { filterRecords } from 'src/app/shared/operators/filter-records.operator';
import { ComponentStore } from 'src/app/state/component.store';
import { Store } from 'src/app/state/store';
import { TimesheetSummary } from '../../shared-timesheet/interfaces';
import { WeekCriteria } from '../../shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetSummaryAggregator } from '../../shared-timesheet/services/timesheet-summary.aggregator';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { ComponentStoreState, StoreState } from '../store-state.interface';
import { NextWeekActionId, PreviousWeekActionId, SetTimesheetCriteriaActionId } from './component.reducers';

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
        this.componentStore.dispatch({ actionId: PreviousWeekActionId })
    
    nextWeek = (): void =>       
        this.componentStore.dispatch({ 
            actionId: NextWeekActionId, 
            currYear: this.currentYear, 
            currWeekNr: this.currentWeekNr 
        })

    updateCriteria = (weekCriteria: WeekCriteria) => 
        this.componentStore.dispatch({ actionId: SetTimesheetCriteriaActionId, weekCriteria })
}