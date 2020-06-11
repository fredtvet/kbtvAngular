import { NgModule } from '@angular/core';

import { TimesheetAdminRoutingModule } from './timesheet-admin-routing.module';
import { WeekListFilterSheetWrapperComponent } from '../shared-timesheet/components';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { ConfirmDialogComponent } from '../shared/components';
import { SwipeCardComponent } from './components/swipe-card/swipe-card.component';


@NgModule({
  declarations: [
    TimesheetAdminListComponent,
    TimesheetAdminUserListComponent,
    SwipeCardComponent,
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetAdminRoutingModule
  ]
})
export class TimesheetAdminModule { }
