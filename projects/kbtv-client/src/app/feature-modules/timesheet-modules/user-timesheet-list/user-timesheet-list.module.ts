import { NgModule } from '@angular/core';
import { ModelFormModule } from '@model-form/model-form.module';
import { _timesheetFormToSaveUserTimesheetConverter } from '@shared-timesheet/state/save-user-timesheet/timesheet-form-to-save-user-timesheet.converter';
import { DeleteModelProviders } from 'state-model';
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
    ModelFormModule.forFeature(_timesheetFormToSaveUserTimesheetConverter),
    UserTimesheetListRoutingModule,
  ]
})
export class UserTimesheetListModule {
  constructor(){}
}
