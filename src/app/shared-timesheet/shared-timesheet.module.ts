import { NgModule } from '@angular/core';

import { 
  TimesheetCardComponent, 
  WeekFilterViewComponent,  
  TimesheetSummaryCardContentComponent, 
} from './components';

import { GetDateByDateParamsPipe, ArrayIncludesPipe, ReadableDurationPipe } from './pipes';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppOwlDateTimeModule } from 'src/app/app-owl-date-time/app-owl-date-time.module';
import { TimesheetFilterViewComponent } from './components/timesheet-filter-view/timesheet-filter-view.component';

@NgModule({
  declarations: [
    TimesheetCardComponent,
    TimesheetFilterViewComponent,
    WeekFilterViewComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
  ],
  imports: [
    SharedModule,
    AppOwlDateTimeModule
  ],
  exports: [
    SharedModule,
    AppOwlDateTimeModule,
    TimesheetFilterViewComponent,
    TimesheetCardComponent,
    WeekFilterViewComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
  ]
})
export class SharedTimesheetModule { }
