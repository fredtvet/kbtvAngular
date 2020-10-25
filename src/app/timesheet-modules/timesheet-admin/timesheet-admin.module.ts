import { NgModule } from '@angular/core';
import { TimesheetAdminRoutingModule } from './timesheet-admin-routing.module';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';
import { SwipeCardComponent } from './components/swipe-card/swipe-card.component';
import { TimesheetAdminWeekListComponent } from './timesheet-admin-week-list/timesheet-admin-week-list.component';
import { TimesheetAdminStore } from './timesheet-admin.store';
import { SaveModelHttpEffect } from 'src/app/core/services/model/state/save-model/save-model.http.effect';
import { SaveModelReducer } from 'src/app/core/services/model/state/save-model/save-model.reducer';
import { UpdateStatusesHttpEffect } from './update-statuses/update-statuses.http.effect';
import { UpdateStatusesReducer } from './update-statuses/update-statuses.reducer';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';

@NgModule({
  declarations: [
    TimesheetAdminListComponent,
    TimesheetAdminUserListComponent,
    SwipeCardComponent,
    TimesheetAdminWeekListComponent,
  ],
  providers:[
    {provide: "FILTER_STORE", useExisting: TimesheetAdminStore}
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetAdminRoutingModule
  ]
})
export class TimesheetAdminModule {
  constructor(
    updateStatusesHttpEffect: UpdateStatusesHttpEffect,
    updateStatusesReducer: UpdateStatusesReducer,
    saveModelHttpEffect:SaveModelHttpEffect,
    saveModelReducer: SaveModelReducer
  ){}
}
