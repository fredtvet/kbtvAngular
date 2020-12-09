import { NgModule } from '@angular/core';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { UserTimesheetCardDialogWrapperComponent } from './user-timesheet-week/user-timesheet-card-dialog-wrapper.component';
import { TimesheetDayLabelComponent } from './user-timesheet-week/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './user-timesheet-week/timesheet-mission-bar/timesheet-mission-bar.component';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';
import { UserTimesheetWeekViewComponent } from './user-timesheet-week/user-timesheet-week-view/user-timesheet-week-view.component';
import { UserTimesheetWeekRoutingModule } from './user-timesheet-week-routing.module';
import { SaveUserTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { DeleteModelProviders } from '@model/state/providers.const';
import { UserTimesheetFormToSaveModelAdapter } from '@shared-timesheet/state/save-user-timesheet/user-timesheet-form-to-save-model.adapter';
import { ModelFormModule } from '@model-form/model-form.module';

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
    ModelFormModule.forFeature(UserTimesheetFormToSaveModelAdapter),
    UserTimesheetWeekRoutingModule
  ]
})
export class UserTimesheetWeekModule {
  constructor(){}
}
