import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, ModelStateCommandsModule, SaveModelAction, SetSaveModelStateAction } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule } from 'state-management';
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
    StateManagementModule.forFeature({}), 
    ModelStateCommandsModule,
    ModelFormModule,
    OptimisticHttpModule.forFeature({
      [SetSaveModelStateAction]: GenericActionRequestMap[SetSaveModelStateAction],
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
    }),
    UserTimesheetListRoutingModule,
  ],
  providers:[ ],
})
export class UserTimesheetListModule {
  constructor(){}
}
