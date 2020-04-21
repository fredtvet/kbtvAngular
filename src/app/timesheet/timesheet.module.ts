import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { TimesheetDayLabelComponent } from './timesheet-week-list/timesheet-day-label/timesheet-day-label.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { TimesheetWeekMenuComponent } from './timesheet-week-list/timesheet-week-menu/timesheet-week-menu.component';
import { TimesheetMissionBarComponent } from './timesheet-week-list/timesheet-mission-bar/timesheet-mission-bar.component';
import { TimesheetCardDialogWrapperComponent } from './components/timesheet-card-dialog-wrapper.component';
import { TimesheetFormDialogWrapperComponent } from './components/timesheet-form-dialog-wrapper.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetListMenuComponent } from './timesheet-list/timesheet-list-menu/timesheet-list-menu.component';
import { TimesheetCardComponent } from './components/timesheet-card/timesheet-card.component';
import { TimesheetFilterSheetWrapperComponent } from '../shared/components';



@NgModule({
  declarations: [
    TimesheetWeekListComponent,
    TimesheetDayLabelComponent,
    TimesheetFormComponent,
    TimesheetCardComponent,
    TimesheetWeekMenuComponent,
    TimesheetMissionBarComponent,
    TimesheetCardDialogWrapperComponent,
    TimesheetFormDialogWrapperComponent,
    TimesheetListComponent,
    TimesheetListMenuComponent,
  ],
  entryComponents:[
    TimesheetFilterSheetWrapperComponent,
    TimesheetCardDialogWrapperComponent,
    TimesheetFormDialogWrapperComponent,
  ],
  imports: [
    SharedModule,
    TimesheetRoutingModule
  ]
})
export class TimesheetModule { }
