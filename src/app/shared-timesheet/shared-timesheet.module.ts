import { NgModule } from '@angular/core';
import { AppOwlDateTimeModule } from 'src/app/app-owl-date-time/app-owl-date-time.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  TimesheetCardComponent,

  TimesheetSummaryCardContentComponent, WeekFilterViewComponent
} from './components';
import { TimesheetFilterViewComponent } from './components/timesheet-filter-view/timesheet-filter-view.component';
import { ArrayIncludesPipe, GetDateByDateParamsPipe, ReadableDurationPipe } from './pipes';


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
  ],
})
export class SharedTimesheetModule { }
