import { NgModule } from '@angular/core';
import { DeleteModelProviders } from '@model/state/providers.const';
import { UserTimesheetFormToSaveModelAdapter } from '@shared-timesheet/state/save-user-timesheet/user-timesheet-form-to-save-model.adapter';
import { ModelFormModule } from '@shared/model-form/model-form.module';
import { StateModule } from '@state/state.module';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { SaveUserTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { UserTimesheetListRoutingModule } from './user-timesheet-list-routing.module';
import { UserTimesheetListViewComponent } from './user-timesheet-list/user-timesheet-list-view/user-timesheet-list-view.component';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';

@NgModule({
  declarations: [
    UserTimesheetListComponent,
    UserTimesheetListViewComponent,
  ],
  providers:[
    ...SaveUserTimesheetProviders,
    ...DeleteModelProviders,
  ],
  imports: [
    SharedTimesheetModule,
    ModelFormModule.forFeature(UserTimesheetFormToSaveModelAdapter),
    StateModule,
    UserTimesheetListRoutingModule,
  ]
})
export class UserTimesheetListModule {
  constructor(){}
}
