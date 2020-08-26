import { NgModule } from '@angular/core';

import { 
  TimesheetCardComponent, 
  WeekFilterComponent, 
  WeekFilterSheetWrapperComponent,  
  TimesheetFilterSheetWrapperComponent, 
  TimesheetSummaryCardContentComponent, 
  TimesheetFilterComponent
} from './components';

import { GetDateByDateParamsPipe, ArrayIncludesPipe, ReadableDurationPipe } from './pipes';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppOwlDateTimeModule } from 'src/app/app-owl-date-time/app-owl-date-time.module';

@NgModule({
  declarations: [
    TimesheetCardComponent,
    WeekFilterComponent,
    WeekFilterSheetWrapperComponent,
    TimesheetFilterSheetWrapperComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
    TimesheetFilterComponent,
  ],
  imports: [
    SharedModule,
    AppOwlDateTimeModule
  ],
  exports: [
    SharedModule,
    AppOwlDateTimeModule,
    TimesheetCardComponent,
    WeekFilterComponent,
    WeekFilterSheetWrapperComponent,
    TimesheetFilterSheetWrapperComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
    TimesheetFilterComponent
  ]
})
export class SharedTimesheetModule { }
