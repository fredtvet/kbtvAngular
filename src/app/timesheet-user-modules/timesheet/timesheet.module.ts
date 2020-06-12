import { NgModule } from '@angular/core';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetDayLabelComponent } from './timesheet-week-view/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './timesheet-week-view/timesheet-mission-bar/timesheet-mission-bar.component';
import { TimesheetCardDialogWrapperComponent } from './components/timesheet-card-dialog-wrapper.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetWeekViewComponent } from './timesheet-week-view/timesheet-week-view.component';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { SharedTimesheetModule } from 'src/app/shared-timesheet/shared-timesheet.module';

@NgModule({
  declarations: [
    TimesheetWeekListComponent,
    TimesheetDayLabelComponent,
    TimesheetMissionBarComponent,
    TimesheetCardDialogWrapperComponent,
    TimesheetListComponent,
    TimesheetWeekViewComponent,
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetRoutingModule
  ]
})
export class TimesheetModule { }
