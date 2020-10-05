import { NgModule } from '@angular/core';
import { UserTimesheetCardDialogWrapperComponent } from './user-timesheet-card-dialog-wrapper.component';
import { SharedTimesheetModule } from 'src/app/shared-timesheet/shared-timesheet.module';
import { UserTimesheetListRoutingModule } from './user-timesheet-list-routing.module';
import { UserTimesheetWeekListComponent } from './user-timesheet-week-list/user-timesheet-week-list.component';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';
import { UserTimesheetListStore } from './user-timesheet-list.store';
import { TimesheetDayLabelComponent } from './user-timesheet-week/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './user-timesheet-week/timesheet-mission-bar/timesheet-mission-bar.component';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';
import { UserTimesheetWeekListViewComponent } from './user-timesheet-week-list/user-timesheet-week-list-view/user-timesheet-week-list-view.component';
import { UserTimesheetListViewComponent } from './user-timesheet-list/user-timesheet-list-view/user-timesheet-list-view.component';

@NgModule({
  declarations: [
    UserTimesheetWeekListComponent,
    UserTimesheetWeekListViewComponent,
    UserTimesheetWeekComponent,
    UserTimesheetListComponent,
    UserTimesheetListViewComponent,
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
