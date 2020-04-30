import { NgModule } from '@angular/core';

import { TimesheetAdminRoutingModule } from './timesheet-admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TimesheetYearListComponent } from './timesheet-year-list/timesheet-year-list.component';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { UsernameToFullnamePipe } from '../shared/pipes';
import { WeekListFilterSheetWrapperComponent } from '../shared/components';


@NgModule({
  declarations: [
    TimesheetYearListComponent,
    TimesheetWeekListComponent
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
