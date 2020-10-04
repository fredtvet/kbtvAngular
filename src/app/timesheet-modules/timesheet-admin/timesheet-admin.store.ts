import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Timesheet, User } from 'src/app/core/models';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { ApiService } from 'src/app/core/services/api.service';
import { SaveModelToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-to-state-http.converter';
import { StateHttpCommandHandler } from "src/app/core/services/state/state-http-command.handler";
import { TimesheetSummaryAggregator } from 'src/app/core/services/utility/timesheet-summary.aggregator';
import { WeekToTimesheetCriteriaConverter } from 'src/app/core/services/utility/week-to-timesheet-criteria.converter';
import { _addOrUpdateRange } from 'src/app/shared-app/helpers/array/add-or-update-range.helper';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from 'src/app/shared-timesheet/base-timesheet-store';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { GroupByPeriod, TimesheetStatus } from 'src/app/shared/enums';
import { StoreState } from './store-state';
import { FilterStore } from 'src/app/core/services/filter/interfaces';
import { SaveModelStateCommand } from 'src/app/core/services/model/interfaces';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { StateAction } from 'src/app/core/services/state/state-action.enum';

const TimesheetAdminStoreSettings: BaseTimesheetStoreSettings<StoreState> = {
    criteriaProp: "timesheetAdminCriteria", 
    groupByProp: "timesheetAdminGroupBy", 
    initialState: {timesheetAdminGroupBy: GroupByPeriod.Week}
};

@Injectable({
  providedIn: 'any'
})
export class TimesheetAdminStore extends BaseTimesheetStore<StoreState> implements FilterStore<WeekCriteria, WeekFilterViewConfig>{

    weekCriteria = this.getStateProperty<WeekCriteria>("timesheetAdminWeekCriteria");
    weekCriteria$ = this.stateProperty$<WeekCriteria>("timesheetAdminWeekCriteria");

    filterConfig$: Observable<WeekFilterViewConfig> = combineLatest([
        this.modelProperty$<User[]>("users"), 
        this.stateProperty$("timesheetAdminCriteria")
    ]).pipe(map(([users]) => { return {criteria: this.weekCriteria, users}}))

    constructor(
        base: ObservableStoreBase,
        apiService: ApiService,
        summaryAggregator: TimesheetSummaryAggregator,
        getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
        private stateHttpCommandHandler: StateHttpCommandHandler,
        private weekToTimesheetCriteriaConverter: WeekToTimesheetCriteriaConverter,
        private saveStateHttpConverter: SaveModelToStateHttpConverter<StoreState, SaveModelStateCommand<Timesheet>>
    ){
        super(base, apiService, summaryAggregator, getRangeWithRelationsHelper, 
            TimesheetAdminStoreSettings)
    }
    
    addFilterCriteria = (criteria: WeekCriteria): void =>       
        this.addTimesheetCriteria(
            this.weekToTimesheetCriteriaConverter.convert(criteria), 
            {timesheetAdminWeekCriteria: criteria}
        )
    
    changeStatus = (entity: Timesheet): void => 
        this.stateHttpCommandHandler.dispatch(this.saveStateHttpConverter.convert(
                {entity, stateProp: "timesheets", saveAction: StateAction.Update},
                `${ApiUrl.Timesheet}/${entity.id}/Status`
        ))
    
    changeStatuses(ids: string[], status: TimesheetStatus): void{
        if(ids.length == 0) return;

        const updatedTimesheets = ids.map(id => { return {id, status} });

        const stateFunc = (state: StoreState) => { return {
                timesheets: _addOrUpdateRange(state.timesheets, updatedTimesheets, "id")
            }};

        this.stateHttpCommandHandler.dispatch({
            httpMethod: "PUT", 
            httpBody: {ids, status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`,
            properties: ["timesheets"], 
            stateFunc
        });      
    }
    
}