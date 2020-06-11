import { NgModule } from '@angular/core';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetDayLabelComponent } from './timesheet-week-view/timesheet-day-label/timesheet-day-label.component';
import { TimesheetFormComponent } from './components/timesheet-form/timesheet-form.component';
import { TimesheetMissionBarComponent } from './timesheet-week-view/timesheet-mission-bar/timesheet-mission-bar.component';
import { TimesheetCardDialogWrapperComponent } from './components/timesheet-card-dialog-wrapper.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetWeekViewComponent } from './timesheet-week-view/timesheet-week-view.component';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { TimesheetFormSheetWrapperComponent } from './components/timesheet-form/timesheet-form-sheet-wrapper.component';
import { TimesheetFormViewComponent } from './components/timesheet-form/timesheet-form-view/timesheet-form-view.component';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { TimesheetFilterSheetWrapperComponent, WeekListFilterSheetWrapperComponent } from '../shared-timesheet/components';

@NgModule({
  declarations: [
    TimesheetWeekListComponent,
    TimesheetDayLabelComponent,
    TimesheetFormComponent,
    TimesheetMissionBarComponent,
    TimesheetCardDialogWrapperComponent,
    TimesheetListComponent,
    TimesheetWeekViewComponent,
    TimesheetFormSheetWrapperComponent,
    TimesheetFormViewComponent,
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetRoutingModule
  ]
})
export class TimesheetModule { }
