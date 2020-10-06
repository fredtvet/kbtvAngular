import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { ApiService } from 'src/app/core/services/api.service';
import { TimesheetSummaryAggregator } from 'src/app/core/services/utility/timesheet-summary.aggregator';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from 'src/app/shared-timesheet/base-timesheet-store';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetCriteria, TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';
import { StoreState } from './store-state';
import { FilterStore } from 'src/app/core/services/filter/interfaces';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { Timesheet } from 'src/app/core/models';

const TimesheetStatisticStoreSettings: BaseTimesheetStoreSettings<StoreState> = {
    criteriaProp: "timesheetStatisticCriteria", 
    groupByProp: "timesheetStatisticGroupBy", 
    initialState: {
        timesheetStatisticGroupBy: GroupByPeriod.Month,
    }
};

@Injectable({
  providedIn: 'any'
})
export class TimesheetStatisticStore extends BaseTimesheetStore<StoreState> 
    implements FilterStore<TimesheetCriteria, TimesheetFilterViewConfig> {
     
    criteria$ = this.stateProperty$<TimesheetCriteria>("timesheetStatisticCriteria");

    filterConfig$: Observable<TimesheetFilterViewConfig> = 
        this.stateSlice$(["missions", "users", "timesheetStatisticCriteria"]).pipe(map(state => {
            return {
                criteria: state.timesheetStatisticCriteria, 
                state: {
                    missions: state.missions, 
                    users: state.users
                }}
        }));

    tableData$: Observable<(Timesheet | TimesheetSummary)[]> = combineLatest([
        this.users$,
        this.timesheetSummaries$,
        this.filteredTimesheets$
    ]).pipe(map(([users, grouped, filtered]) => {
        if(grouped.groupBy === GroupByPeriod.None) return this.addFullNameToEntities(filtered.records, users);
        else return grouped.records;
    }))

    constructor(
        base: ObservableStoreBase,
        apiService: ApiService,        
        summaryAggregator: TimesheetSummaryAggregator,
        getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
    ){
        super(
            base,
            apiService, 
            summaryAggregator, 
            getRangeWithRelationsHelper, 
            TimesheetStatisticStoreSettings
        )
    }

    addFilterCriteria = (criteria: TimesheetCriteria) => {
        super.addTimesheetCriteria(criteria);
    }
}