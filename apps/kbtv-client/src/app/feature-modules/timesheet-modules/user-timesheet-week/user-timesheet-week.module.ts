import { SaveUserTimesheetAction } from '@actions/timesheet-actions';
import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { SaveUserTimesheetReducer } from '@shared-timesheet/state/save-user-timesheet.reducer';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, DeleteModelReducer, SaveModelAction } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule } from 'state-management';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { UserTimesheetWeekRoutingModule } from './user-timesheet-week-routing.module';
import { TimesheetDayLabelComponent } from './user-timesheet-week/timesheet-day-label/timesheet-day-label.component';
import { TimesheetMissionBarComponent } from './user-timesheet-week/timesheet-mission-bar/timesheet-mission-bar.component';
import { UserTimesheetWeekViewComponent } from './user-timesheet-week/user-timesheet-week-view/user-timesheet-week-view.component';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';

@NgModule({
  declarations: [
    UserTimesheetWeekComponent,
    UserTimesheetWeekViewComponent,
    TimesheetDayLabelComponent,
    TimesheetMissionBarComponent,
  ],
  imports: [
    SharedTimesheetModule,
    StateManagementModule.forFeature({reducers: [SaveUserTimesheetReducer, DeleteModelReducer]}), 
    ModelFormModule,
    OptimisticHttpModule.forFeature({
      [SaveUserTimesheetAction]: GenericActionRequestMap[SaveModelAction],
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
    }),
    UserTimesheetWeekRoutingModule
  ] , 
  providers:[],
})
export class UserTimesheetWeekModule {
  constructor(){}
}
