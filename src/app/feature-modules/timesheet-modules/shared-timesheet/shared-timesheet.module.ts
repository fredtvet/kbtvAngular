import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StateModule } from '@state/state.module';
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
    StateModule,
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
export class SharedTimesheetModule {}
