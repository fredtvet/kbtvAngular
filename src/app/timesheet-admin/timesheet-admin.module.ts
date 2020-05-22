import { NgModule } from '@angular/core';

import { TimesheetAdminRoutingModule } from './timesheet-admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WeekListFilterSheetWrapperComponent, ConfirmDialogComponent } from '../shared/components';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';


@NgModule({
  declarations: [
    TimesheetAdminListComponent,
    TimesheetAdminUserListComponent
  ],
  entryComponents:[
    WeekListFilterSheetWrapperComponent,
    ConfirmDialogComponent
  ],
  imports: [
    SharedModule,
    TimesheetAdminRoutingModule
  ]
})
export class TimesheetAdminModule { }
