import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Timesheet, User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { SaveModelAction, SaveModelStateCommand } from 'src/app/core/services/model/state/save-model/save-model-state-command.interface';
import { PersistanceStore } from 'src/app/core/services/persistance/persistance.store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { Roles } from 'src/app/shared-app/enums';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { WeekCriteriaFormState } from 'src/app/shared/constants/forms/week-criteria-controls.const';
import { GroupByPeriod, TimesheetStatus } from 'src/app/shared/enums';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from '../shared-timesheet/base-timesheet-store';
import { TimesheetSummary } from '../shared-timesheet/interfaces';
import { WeekCriteria } from '../shared-timesheet/interfaces/week-criteria.interface';
import { TimesheetSummaryAggregator } from '../shared-timesheet/services/timesheet-summary.aggregator';
import { WeekToTimesheetCriteriaAdapter } from '../shared-timesheet/week-to-timesheet-criteria.adapter';
import { StoreState } from './store-state';
import { UpdateStatusesAction, UpdateStatusesStateCommand } from './update-statuses/update-statuses-state-command.interface';

const TimesheetAdminStoreSettings: BaseTimesheetStoreSettings<StoreState> = {
    criteriaProp: "timesheetAdminCriteria", 
    groupByProp: "timesheetAdminGroupBy", 
    initialState: {timesheetAdminGroupBy: GroupByPeriod.Week}
};

@Injectable({
  providedIn: 'any'
})
export class TimesheetAdminStore extends BaseTimesheetStore<StoreState> {

    get weekCriteria(){ return this.getStateProperty<WeekCriteria>("timesheetAdminWeekCriteria"); } 
    weekCriteria$ = this.stateProperty$<WeekCriteria>("timesheetAdminWeekCriteria");

    timesheetSummaries$: Observable<TimesheetSummary[]> = this.filteredAndGroupedTimesheets$.pipe(map(x => 
        x.groupBy === GroupByPeriod.None ? null : x.records as any
    ));

    weekCriteriaFormState$: Observable<WeekCriteriaFormState> = 
        this.users$.pipe(map(x => { return { options: {users: x} } }))

    constructor(
        base: ObservableStoreBase,
        apiService: ApiService,
        persistanceStore: PersistanceStore,
        summaryAggregator: TimesheetSummaryAggregator,
        getRangeWithRelationsHelper: GetRangeWithRelationsHelper,
        private commandDispatcher: CommandDispatcher,
    ){
        super(base, apiService, persistanceStore, summaryAggregator, getRangeWithRelationsHelper, 
            TimesheetAdminStoreSettings)
    }
    
    addFilterCriteria = (criteria: WeekCriteria): void =>       
        this.addTimesheetCriteria(
            new WeekToTimesheetCriteriaAdapter(criteria),
            {timesheetAdminWeekCriteria: criteria}
        )
    
    updateStatus = (entity: Timesheet): void => 
        this.commandDispatcher.dispatch<SaveModelStateCommand<Timesheet>>({
            entity,
            stateProp: "timesheets",
            action: SaveModelAction,
            saveAction: StateAction.Update,
            apiUrlOverride: `${ApiUrl.Timesheet}/${entity.id}/Status`                             
        })
    
    updateStatuses(ids: string[], status: TimesheetStatus): void{
        if(ids.length == 0) return;
        this.commandDispatcher.dispatch<UpdateStatusesStateCommand>({
            ids, 
            status,
            action: UpdateStatusesAction,
        });      
    }
    
}