import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission, User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { PersistanceStore } from 'src/app/core/services/persistance/persistance.store';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { TimesheetCriteriaFormState } from 'src/app/shared/constants/forms/timesheet-criteria-form.const';
import { GroupByPeriod } from 'src/app/shared/enums';
import { BaseTimesheetStoreSettings, BaseTimesheetStore } from '../shared-timesheet/base-timesheet-store';
import { TimesheetCriteria } from '../shared-timesheet/interfaces';
import { TimesheetSummaryAggregator } from '../shared-timesheet/services/timesheet-summary.aggregator';
import { StoreState } from './store-state';

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
export class TimesheetStatisticStore extends BaseTimesheetStore<StoreState> {
     
    criteria$ = this.stateProperty$<TimesheetCriteria>("timesheetStatisticCriteria");

    criteriaFormState$: Observable<TimesheetCriteriaFormState> = 
        combineLatest([
            this.modelProperty$<Mission[]>("missions", false),
            this.modelProperty$<User[]>("users", false)
        ]).pipe(map(([missions, users]) => { return {options: {missions, users}} }))

    constructor(
        base: ObservableStoreBase,
        apiService: ApiService,     
        persistanceStore: PersistanceStore,   
        summaryAggregator: TimesheetSummaryAggregator,
        getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
    ){
        super(
            base,
            apiService, 
            persistanceStore,
            summaryAggregator, 
            getRangeWithRelationsHelper, 
            TimesheetStatisticStoreSettings
        )
    }

    getCriteria(): TimesheetCriteria{
        return this.getStateProperty("timesheetStatisticCriteria")
    }

    addFilterCriteria = (criteria: TimesheetCriteria) => {
        super.addTimesheetCriteria(criteria);
    }
}