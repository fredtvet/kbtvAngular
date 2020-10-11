import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedTimesheetModule } from 'src/app/shared-timesheet/shared-timesheet.module';
import { UserTimesheetFormRoutingModule } from './user-timesheet-form-routing.module';
import { UserTimesheetFormViewComponent } from './user-timesheet-form-view/user-timesheet-form-view.component';

@NgModule({
    declarations: [
      UserTimesheetFormViewComponent,
    ],
    imports: [
      SharedTimesheetModule,
      UserTimesheetFormRoutingModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  export class UserTimesheetFormModule {  }