import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { TimesheetDayLabelComponent } from './timesheet-week-list/timesheet-day-label/timesheet-day-label.component';
import { TimesheetDetailsComponent } from './timesheet-details/timesheet-details.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { TimesheetDetailsViewComponent } from './timesheet-details/timesheet-details-view/timesheet-details-view.component';
import { TimesheetCardComponent } from './components/timesheet-card/timesheet-card.component';
import { TimesheetWeekMenuComponent } from './timesheet-week-list/timesheet-week-menu/timesheet-week-menu.component';
import { BottomSheetComponent } from '../shared/layout';
import { TimesheetMissionBarComponent } from './timesheet-week-list/timesheet-mission-bar/timesheet-mission-bar.component';
import { TimesheetCardDialogWrapperComponent } from './components/timesheet-card-dialog-wrapper/timesheet-card-dialog-wrapper.component';



@NgModule({
  declarations: [
    TimesheetWeekListComponent,
    TimesheetDayLabelComponent,
    TimesheetDetailsComponent,
    TimesheetFormComponent,
    TimesheetDetailsViewComponent,
    TimesheetCardComponent,
    TimesheetWeekMenuComponent,
    TimesheetMissionBarComponent,
    TimesheetCardDialogWrapperComponent,
  ],
  entryComponents:[
    BottomSheetComponent,
    TimesheetCardDialogWrapperComponent,
  ],
  imports: [
    SharedModule,
    TimesheetRoutingModule
  ]
})
export class TimesheetModule { }
