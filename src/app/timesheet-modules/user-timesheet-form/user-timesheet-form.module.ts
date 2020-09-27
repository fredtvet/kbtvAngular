import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SaveModelToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-to-state-http.converter';
import { ModelFormStore } from 'src/app/core/services/model/form/model-form.store';
import { SharedTimesheetModule } from 'src/app/shared-timesheet/shared-timesheet.module';
import { SaveUserTimesheetToStateHttpConverter } from './save-user-timesheet-to-state-http.converter';
import { UserTimesheetFormRoutingModule } from './user-timesheet-form-routing.module';
import { UserTimesheetFormViewComponent } from './user-timesheet-form-view/user-timesheet-form-view.component';

@NgModule({
    declarations: [
      UserTimesheetFormViewComponent,
    ],
    providers:[  
      ModelFormStore,
      {provide: SaveModelToStateHttpConverter, useClass: SaveUserTimesheetToStateHttpConverter}
    ],
    imports: [
      SharedTimesheetModule,
      UserTimesheetFormRoutingModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  export class UserTimesheetFormModule { }