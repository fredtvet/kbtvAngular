import { NgModule } from '@angular/core';

import { TimesheetAdminRoutingModule } from './timesheet-admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsernameToFullnamePipe } from '../shared/pipes';
import { WeekListFilterSheetWrapperComponent } from '../shared/components';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';


@NgModule({
  declarations: [
    TimesheetAdminListComponent
  ],
  providers:[
    UsernameToFullnamePipe,
  ],
  entryComponents:[
    WeekListFilterSheetWrapperComponent
  ],
  imports: [
    SharedModule,
    TimesheetAdminRoutingModule
  ]
})
export class TimesheetAdminModule { }
