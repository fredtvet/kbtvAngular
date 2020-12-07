import { NgModule } from '@angular/core';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { UserTimesheetCardDialogWrapperComponent } from './user-timesheet-week/user-timesheet-card-dialog-wrapper.component';
import { TimesheetDayLabelComponent } from './user-timesheet-week/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './user-timesheet-week/timesheet-mission-bar/timesheet-mission-bar.component';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';
import { UserTimesheetWeekViewComponent } from './user-timesheet-week/user-timesheet-week-view/user-timesheet-week-view.component';
import { UserTimesheetWeekRoutingModule } from './user-timesheet-week-routing.module';
import { SaveUserTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { ModelFormModule } from '@shared/model-form/model-form.module';
import { StateModule } from '@state/state.module';
import { DeleteModelProviders } from '@model/state/providers.const';

@NgModule({
  declarations: [
    UserTimesheetWeekComponent,
    UserTimesheetWeekViewComponent,
    UserTimesheetCardDialogWrapperComponent,
    TimesheetDayLabelComponent,
    TimesheetMissionBarComponent,
  ],
  providers:[
    ...SaveUserTimesheetProviders,
    ...DeleteModelProviders,
  ],
  imports: [
    SharedTimesheetModule,
    ModelFormModule,
    StateModule,
    UserTimesheetWeekRoutingModule
  ]
})
export class UserTimesheetWeekModule {
  constructor(){}
}
