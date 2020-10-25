import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  TimesheetCardComponent,
  TimesheetSummaryCardContentComponent
} from './components';
import { ArrayIncludesPipe, GetDateByDateParamsPipe, ReadableDurationPipe } from './pipes';


@NgModule({
  declarations: [
    TimesheetCardComponent,
    TimesheetSummaryCardContentComponent,
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
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
  ],
})
export class SharedTimesheetModule { }
