import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { ApiService } from 'src/app/core/services/api.service';
import { TimesheetSummaryAggregator } from 'src/app/core/services/utility/timesheet-summary.aggregator';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from 'src/app/shared-timesheet/base-timesheet-store';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';
import { StoreState } from './store-state';
import { FilterStore } from 'src/app/core/services/filter/interfaces';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';

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
     
    filterConfig$: Observable<TimesheetFilterViewConfig> = 
        this.stateSlice$(["missions", "users", "timesheetStatisticCriteria"]).pipe(map(state => {
            return {
                criteria: state.timesheetStatisticCriteria, 
                state: {
                    missions: state.missions, 
                    users: state.users
                }}
        }));

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

    addFilterCriteria(criteria: TimesheetCriteria){
        super.addTimesheetCriteria(criteria);
    }
}