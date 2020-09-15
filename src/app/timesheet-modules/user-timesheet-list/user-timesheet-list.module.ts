import { NgModule } from '@angular/core';
import { UserTimesheetCardDialogWrapperComponent } from './user-timesheet-card-dialog-wrapper.component';
import { SharedTimesheetModule } from 'src/app/shared-timesheet/shared-timesheet.module';
import { TimesheetDayLabelComponent } from './user-timesheet-week-view/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './user-timesheet-week-view/timesheet-mission-bar/timesheet-mission-bar.component';
import { UserTimesheetWeekViewComponent } from './user-timesheet-week-view/user-timesheet-week-view.component';
import { UserTimesheetListRoutingModule } from './user-timesheet-list-routing.module';
import { UserTimesheetWeekListComponent } from './user-timesheet-week-list/user-timesheet-week-list.component';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';
import { UserTimesheetListStore } from './user-timesheet-list.store';

@NgModule({
  declarations: [
    UserTimesheetWeekListComponent,
    UserTimesheetWeekViewComponent,
    UserTimesheetListComponent,
    UserTimesheetCardDialogWrapperComponent,
    TimesheetDayLabelComponent,
    TimesheetMissionBarComponent,
  ],
  providers:[
    {provide: "FILTER_STORE", useExisting: UserTimesheetListStore}
  ],
  imports: [
    SharedTimesheetModule,
    UserTimesheetListRoutingModule
  ]
})
export class UserTimesheetListModule { }
