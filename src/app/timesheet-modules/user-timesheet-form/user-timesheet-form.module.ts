import { NgModule } from '@angular/core';
import { UserTimesheetFormEntryComponent } from './user-timesheet-form-entry.component';
import { SharedTimesheetModule } from 'src/app/shared-timesheet/shared-timesheet.module';
import { UserTimesheetFormSheetWrapperComponent } from './user-timesheet-form/user-timesheet-form-sheet-wrapper.component';
import { UserTimesheetFormComponent } from './user-timesheet-form/user-timesheet-form.component';
import { UserTimesheetFormViewComponent } from './user-timesheet-form/user-timesheet-form-view/user-timesheet-form-view.component';
import { UserTimesheetFormRoutingModule } from './user-timesheet-form-routing.module';

@NgModule({
    declarations: [
      UserTimesheetFormEntryComponent,
      UserTimesheetFormSheetWrapperComponent,
      UserTimesheetFormComponent,
      UserTimesheetFormViewComponent,
    ],
    imports: [
      SharedTimesheetModule,
      UserTimesheetFormRoutingModule
    ]
  })
  export class UserTimesheetFormModule { }