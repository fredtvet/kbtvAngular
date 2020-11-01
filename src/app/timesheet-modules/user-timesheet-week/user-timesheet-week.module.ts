import { NgModule } from '@angular/core';
import { UserTimesheetCardDialogWrapperComponent } from './user-timesheet-card-dialog-wrapper.component';
import { TimesheetDayLabelComponent } from './user-timesheet-week/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './user-timesheet-week/timesheet-mission-bar/timesheet-mission-bar.component';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { SaveUserTimesheetHttpEffect } from '../shared-timesheet/save-user-timesheet/save-user-timesheet.http.effect';
import { SaveUserTimesheetReducer } from '../shared-timesheet/save-user-timesheet/save-user-timesheet.reducer';
import { UserTimesheetWeekRoutingModule } from './user-timesheet-week-routing.module';

@NgModule({
  declarations: [
    UserTimesheetWeekComponent,
    UserTimesheetCardDialogWrapperComponent,
    TimesheetDayLabelComponent,
    TimesheetMissionBarComponent,
  ],
  imports: [
    SharedTimesheetModule,
    UserTimesheetWeekRoutingModule
  ]
})
export class UserTimesheetWeekModule {
  constructor(
    saveUserTimesheetReducer: SaveUserTimesheetReducer, 
    saveUserTimesheetHttpEffect: SaveUserTimesheetHttpEffect
  ){}
}
