import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { TimesheetDayBarComponent } from './components/timesheet-day-bar/timesheet-day-bar.component';
import { TimesheetDetailsComponent } from './timesheet-details/timesheet-details.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { TimesheetDetailsViewComponent } from './components/timesheet-details-view/timesheet-details-view.component';
import { TimesheetCardComponent } from './components/timesheet-card/timesheet-card.component';
import { TimesheetWeekMenuComponent } from './components/timesheet-week-menu/timesheet-week-menu.component';
import { BottomSheetComponent } from '../shared/layout';
import { TimesheetMissionBarComponent } from './components/timesheet-mission-bar/timesheet-mission-bar.component';
import { TimesheetCardDialogWrapperComponent } from './components/timesheet-card-dialog-wrapper/timesheet-card-dialog-wrapper.component';



@NgModule({
  declarations: [
    TimesheetWeekListComponent,
    TimesheetDayBarComponent,
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
