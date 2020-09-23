import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { FilterStore } from 'src/app/core/filter/interfaces/filter-store.interface';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { GetRangeWithRelationsHelper } from 'src/app/core/model/state-helpers/get-range-with-relations.helper';
import { Timesheet, User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { SaveModelToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-to-state-http.converter';
import { StateHttpCommandHandler } from 'src/app/core/services/state/state-http-command.handler';
import { ArrayHelperService } from 'src/app/core/services/utility/array-helper.service';
import { DateTimeService } from 'src/app/core/services/utility/date-time.service';
import { TimesheetSummaryAggregator } from 'src/app/core/services/utility/timesheet-summary.aggregator';
import { WeekToTimesheetCriteriaConverter } from 'src/app/core/services/utility/week-to-timesheet-criteria.converter';
import { StateAction } from 'src/app/core/state';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from 'src/app/shared-timesheet/base-timesheet-store';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { GroupByPeriod, TimesheetStatus } from 'src/app/shared/enums';
import { StoreState } from './store-state';

const TimesheetAdminStoreSettings: BaseTimesheetStoreSettings<StoreState> = {
    criteriaProp: "timesheetAdminCriteria", 
    groupByProp: "timesheetAdminGroupBy", 
    initialState: {timesheetAdminGroupBy: GroupByPeriod.Week}
};

@Injectable({
  providedIn: 'any'
})
export class TimesheetAdminStore extends BaseTimesheetStore<StoreState> implements FilterStore<WeekCriteria, WeekFilterViewConfig>{

    private _weekCriteria: WeekCriteria; 
    get weekCriteria(): WeekCriteria { return {...this._weekCriteria} };

    filterConfig$: Observable<WeekFilterViewConfig> = combineLatest([
        this.modelProperty$<User[]>("users"), 
        this.property$("timesheetAdminCriteria")
    ]).pipe(map(([users]) => { return {criteria: this.weekCriteria, users}}))

    constructor(
        arrayHelperService: ArrayHelperService,
        apiService: ApiService,
        dateTimeService: DateTimeService,
        summaryAggregator: TimesheetSummaryAggregator,
        getRangeWithRelationsHelper: GetRangeWithRelationsHelper<StoreState>,
        private stateHttpCommandHandler: StateHttpCommandHandler,
        private weekToTimesheetCriteriaConverter: WeekToTimesheetCriteriaConverter,
        private saveStateHttpConverter: SaveModelToStateHttpConverter<StoreState, SaveModelStateCommand<Timesheet>>
    ){
        super(arrayHelperService, apiService, dateTimeService, summaryAggregator, getRangeWithRelationsHelper, 
            TimesheetAdminStoreSettings)
    }
    
    addFilterCriteria(criteria: WeekCriteria): void{
        this._weekCriteria = criteria;
        this.addTimesheetCriteria(this.weekToTimesheetCriteriaConverter.convert(criteria))
    }

    changeStatus(entity: Timesheet): void{
        this.stateHttpCommandHandler.dispatch(this.saveStateHttpConverter.convert(
                {entity, stateProp: "timesheets", saveAction: StateAction.Update},
                `${ApiUrl.Timesheet}/${entity.id}/Status`
        ))
    }
    
    changeStatuses(ids: string[], status: TimesheetStatus): void{
        if(ids.length == 0) return;

        const updatedTimesheets = ids.map(id => { return {id, status} });

        const stateFunc = (state: StoreState) => { return {
                timesheets: this.arrayHelperService.addOrUpdateRange(state.timesheets, updatedTimesheets, "id")
            }};

        this.stateHttpCommandHandler.dispatch({
            httpMethod: "PUT", 
            httpBody: {ids, status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`, 
            stateFunc
        });      
    }
    
}