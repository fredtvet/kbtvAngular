import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SetTimesheetCriteriaReducer } from '@shared-timesheet/state/set-timesheet-criteria.reducer';
import { DynamicFormsModule } from 'dynamic-forms';
import { OptimisticStateService } from 'optimistic-http';
import { AppAgGridModule } from 'src/app/app-ag-grid/app-ag-grid.module';
import { STORE_DEFAULT_STATE, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { FetchModelProviders } from 'model/state';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { FetchTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { DefaultState } from './state/default-state.const';
import { FetchTimesheetsEffect } from './state/fetch-timesheets.effect';
import { SetGroupByReducer } from './state/set-group-by.reducer';
import { StoreState } from './state/store-state';
import { TimesheetStatisticRoutingModule } from './timesheet-statistic-routing.module';
import { TimesheetStatisticTableComponent } from './timesheet-statistic/timesheet-statistic-table/timesheet-statistic-table.component';
import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';

@NgModule({
  declarations: [
    TimesheetStatisticComponent,
    TimesheetStatisticTableComponent
  ],
  providers:[
    DatePipe,
    { provide: STORE_DEFAULT_STATE, useValue: DefaultState },  
    { provide: STORE_REDUCERS, useValue: SetTimesheetCriteriaReducer, multi: true},
    { provide: STORE_REDUCERS, useValue: SetGroupByReducer, multi: true},
    { provide: STORE_EFFECTS, useClass: FetchTimesheetsEffect, multi: true},
    ...FetchTimesheetProviders,
    ...FetchModelProviders,
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetStatisticRoutingModule,
    AppAgGridModule,
    DynamicFormsModule
  ],
})
export class TimesheetStatisticModule { 
  constructor(optimisticStateService: OptimisticStateService){
    optimisticStateService.registerStateProps<StoreState>([
      "timesheetStatisticTimesheetCriteria",
      "timesheetStatisticGroupBy",
    ])
  }
}
