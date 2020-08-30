import { Injectable } from '@angular/core';
import { ApiService, ArrayHelperService, TimesheetSummaryAggregator, DateTimeService } from 'src/app/core/services';
import { StoreState } from './store-state';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { Mission } from 'src/app/core/models';
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from 'src/app/shared-timesheet/base-timesheet-store';

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
export class TimesheetStatisticStore extends BaseTimesheetStore<StoreState>{

    get filteredMissions(){
        const criteria = this.getProperty<string>("timesheetStatisticMissionCriteria");
        const missions = this.getProperty<Mission[]>("missions");
        return this.arrayHelperService.filter(missions, (mission) => new MissionFilter(criteria).check(mission))
    }

    constructor(
        arrayHelperService: ArrayHelperService,
        apiService: ApiService,
        summaryAggregator: TimesheetSummaryAggregator,
        dateTimeService: DateTimeService,
    ){
        super(arrayHelperService, apiService, dateTimeService, summaryAggregator, TimesheetStatisticStoreSettings)
    }
}

// public status: TimesheetStatus = TimesheetStatus.Open,    
// public mission: Mission = undefined,    
// public dateRangePreset: DateRangePresets = DateRangePresets.Custom,   
// public dateRange: Date[] = [],
// public userName: string = undefined,