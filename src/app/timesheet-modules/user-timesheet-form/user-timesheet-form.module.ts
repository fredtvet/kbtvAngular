import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedTimesheetModule } from 'src/app/shared-timesheet/shared-timesheet.module';
import { UserTimesheetFormRoutingModule } from './user-timesheet-form-routing.module';
import { SaveUserTimesheetToStateHttpConverter } from './save-user-timesheet-to-state-http.converter';
import { SaveModelToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-to-state-http.converter';
import { ModelFormStore } from 'src/app/core/services/model/form/model-form.store';
import { UserTimesheetFormViewComponent } from './user-timesheet-form-view/user-timesheet-form-view.component';
import { IonDatePickerComponent } from '../../shared-timesheet/components/ion-date-picker.component';

@NgModule({
    declarations: [
      UserTimesheetFormViewComponent,
      IonDatePickerComponent
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