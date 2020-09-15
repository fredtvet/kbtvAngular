import { Injectable } from '@angular/core';
import { ApiService, ArrayHelperService, TimesheetSummaryAggregator, DateTimeService } from 'src/app/core/services';
import { StoreState } from './store-state';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from 'src/app/shared-timesheet/base-timesheet-store';
import { GetRangeWithRelationsHelper } from 'src/app/core/model/state-helpers/get-range-with-relations.helper';
import { FilterStateHelper } from 'src/app/core/services/filter';
import { FilterStore } from 'src/app/core/filter/interfaces/filter-store.interface';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
        arrayHelperService: ArrayHelperService,
        apiService: ApiService,
        dateTimeService: DateTimeService,
        summaryAggregator: TimesheetSummaryAggregator,
        getRangeWithRelationsHelper: GetRangeWithRelationsHelper<StoreState>,
        filterStateHelper: FilterStateHelper,
    ){
        super(
            arrayHelperService, 
            apiService, 
            dateTimeService, 
            summaryAggregator, 
            getRangeWithRelationsHelper, 
            filterStateHelper, 
            TimesheetStatisticStoreSettings
        )
    }

    addFilterCriteria(criteria: TimesheetCriteria){
        super.addTimesheetCriteria(criteria);
    }
}