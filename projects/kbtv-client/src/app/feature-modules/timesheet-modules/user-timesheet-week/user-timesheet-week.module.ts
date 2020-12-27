import { NgModule } from '@angular/core';
import { ModelFormModule } from '@model-form/model-form.module';
import { DeleteModelProviders } from '@model/state/providers.const';
import { _timesheetFormToSaveUserTimesheetConverter } from '@shared-timesheet/state/save-user-timesheet/timesheet-form-to-save-user-timesheet.converter';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { SaveUserTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { UserTimesheetWeekRoutingModule } from './user-timesheet-week-routing.module';
import { TimesheetDayLabelComponent } from './user-timesheet-week/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './user-timesheet-week/timesheet-mission-bar/timesheet-mission-bar.component';
import { UserTimesheetCardDialogWrapperComponent } from './user-timesheet-week/user-timesheet-card-dialog-wrapper.component';
import { UserTimesheetWeekViewComponent } from './user-timesheet-week/user-timesheet-week-view/user-timesheet-week-view.component';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';

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
    ModelFormModule.forFeature(_timesheetFormToSaveUserTimesheetConverter),
    UserTimesheetWeekRoutingModule
  ]
})
export class UserTimesheetWeekModule {
  constructor(){}
}
