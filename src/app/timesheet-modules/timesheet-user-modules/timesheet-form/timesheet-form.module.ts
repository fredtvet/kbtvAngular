import { NgModule } from '@angular/core';
import { TimesheetFormEntryComponent } from './timesheet-form-entry.component';
import { TimesheetFormSheetWrapperComponent } from './timesheet-form/timesheet-form-sheet-wrapper.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { TimesheetFormViewComponent } from './timesheet-form/timesheet-form-view/timesheet-form-view.component';
import { TimesheetFormRoutingModule } from './timesheet-form-routing.module';
import { SharedTimesheetModule } from 'src/app/timesheet-modules/shared-timesheet/shared-timesheet.module';

@NgModule({
    declarations: [
      TimesheetFormEntryComponent,
      TimesheetFormSheetWrapperComponent,
      TimesheetFormComponent,
      TimesheetFormViewComponent,
    ],
    imports: [
      SharedTimesheetModule,
      TimesheetFormRoutingModule
    ]
  })
  export class TimesheetFormModule { }