import { SaveUserTimesheetAction } from '@actions/timesheet-actions';
import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { SaveUserTimesheetReducer } from '@shared-timesheet/state/save-user-timesheet/save-user-timesheet.reducer';
import { _timesheetFormToSaveUserTimesheetConverter } from '@shared-timesheet/state/save-user-timesheet/timesheet-form-to-save-user-timesheet.converter';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, DeleteModelReducer, SaveModelAction } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule, STORE_REDUCERS } from 'state-management';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { UserTimesheetListRoutingModule } from './user-timesheet-list-routing.module';
import { UserTimesheetListViewComponent } from './user-timesheet-list/user-timesheet-list-view/user-timesheet-list-view.component';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';

@NgModule({
  declarations: [
    UserTimesheetListComponent,
    UserTimesheetListViewComponent,
  ],
  imports: [
    SharedTimesheetModule,    
    StateManagementModule.forFeature({reducers: [SaveUserTimesheetReducer, DeleteModelReducer]}), 
    ModelFormModule.forFeature(_timesheetFormToSaveUserTimesheetConverter),
    OptimisticHttpModule.forFeature({
      [SaveUserTimesheetAction]: GenericActionRequestMap[SaveModelAction],
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
    }),
    UserTimesheetListRoutingModule,
  ],
  providers:[
    {provide: STORE_REDUCERS, useValue: SaveUserTimesheetReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
  ],
})
export class UserTimesheetListModule {
  constructor(){}
}
