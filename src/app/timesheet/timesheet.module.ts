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



@NgModule({
  declarations: [
    TimesheetWeekListComponent,
    TimesheetDayBarComponent,
    TimesheetDetailsComponent,
    TimesheetFormComponent,
    TimesheetDetailsViewComponent,
    TimesheetCardComponent,
    TimesheetWeekMenuComponent,
  ],
  entryComponents:[
    BottomSheetComponent,
  ],
  imports: [
    SharedModule,
    TimesheetRoutingModule
  ]
})
export class TimesheetModule { }
