import { NgModule } from '@angular/core';
import { SaveModelReducer } from 'model/state-commands';
import { FetchModelProviders } from 'model/state-fetcher';
import { OptimisticHttpModule, OptimisticStateService } from 'optimistic-http';
import { StateManagementModule, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { FetchTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { AdminTimesheetCardDialogWrapperComponent } from './components/admin-timesheet-card-dialog-wrapper.component';
import { SwipeCardComponent } from './components/swipe-card/swipe-card.component';
import { FetchTimesheetsEffect } from './state/fetch-timesheets.effect';
import { SetSelectedWeekReducer } from './state/set-selected-week.reducer';
import { SetTimesheetCriteriaReducer } from './state/set-timesheet-criteria.reducer';
import { UpdateTimesheetStatusesReducer } from './state/update-timesheet-statuses.reducer';
import { StoreState } from './store-state';
import { TimesheetAdminActionRequestMap } from './timesheet-admin-action-request-map.const';
import { TimesheetAdminListViewComponent } from './timesheet-admin-list/timesheet-admin-list-view/timesheet-admin-list-view.component';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminRoutingModule } from './timesheet-admin-routing.module';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';
import { TimesheetAdminWeekListViewComponent } from './timesheet-admin-week-list/timesheet-admin-week-list-view/timesheet-admin-week-list-view.component';
import { TimesheetAdminWeekListComponent } from './timesheet-admin-week-list/timesheet-admin-week-list.component';

@NgModule({
  declarations: [
    TimesheetAdminListComponent,
    TimesheetAdminListViewComponent,
    TimesheetAdminUserListComponent,
    SwipeCardComponent,
    TimesheetAdminWeekListComponent,
    TimesheetAdminWeekListViewComponent,
    AdminTimesheetCardDialogWrapperComponent
  ],
  providers:[
    ...FetchModelProviders,
    ...FetchTimesheetProviders,
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetAdminRoutingModule,    
    StateManagementModule.forFeature({
      reducers: [SaveModelReducer, UpdateTimesheetStatusesReducer, SetTimesheetCriteriaReducer, SetSelectedWeekReducer], 
      effects: [FetchTimesheetsEffect],
    }), 
    OptimisticHttpModule.forFeature(TimesheetAdminActionRequestMap)
  ]
})
export class TimesheetAdminModule {
  constructor(optimisticStateService: OptimisticStateService){
    optimisticStateService.registerStateProps<StoreState>([
      "timesheetAdminTimesheetCriteria",
      "timesheetAdminWeekCriteria",
      "timesheetAdminSelectedWeekNr"
    ])
  }
}
