import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { SharedModule } from '../shared';
import { TimesheetDayBarComponent } from './components/timesheet-day-bar/timesheet-day-bar.component';
import { TimesheetDetailsComponent } from './timesheet-details/timesheet-details.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { TimesheetDetailsViewComponent } from './components/timesheet-details-view/timesheet-details-view.component';


@NgModule({
  declarations: [
    TimesheetWeekListComponent,
    TimesheetDayBarComponent,
    TimesheetDetailsComponent,
    TimesheetFormComponent,
    TimesheetDetailsViewComponent,
  ],
  entryComponents:[],
  imports: [
    SharedModule,
    TimesheetRoutingModule
  ]
})
export class TimesheetModule { }
