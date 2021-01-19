import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {
  TimesheetListItemContentComponent,
  TimesheetSummaryCardContentComponent
} from './components';
import { TimesheetCardComponent } from './components/timesheet-card/timesheet-card.component';
import { UserTimesheetCardDialogWrapperComponent } from './components/user-timesheet-card-dialog-wrapper.component';
import { ArrayIncludesPipe, GetDateByDateParamsPipe, ReadableDurationPipe } from './pipes';

@NgModule({
  declarations: [
    TimesheetListItemContentComponent,
    TimesheetCardComponent,
    TimesheetSummaryCardContentComponent,
    UserTimesheetCardDialogWrapperComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
    TimesheetCardComponent,
    TimesheetListItemContentComponent,
    UserTimesheetCardDialogWrapperComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
  ],
})
export class SharedTimesheetModule {}
