import { NgModule } from '@angular/core';

import { 
  TimesheetCardComponent, 
  WeekListFilterComponent, 
  WeekListFilterSheetWrapperComponent,  
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
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    TimesheetFilterSheetWrapperComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
    TimesheetFilterComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
    AppOwlDateTimeModule,
    TimesheetCardComponent,
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    TimesheetFilterSheetWrapperComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
    TimesheetFilterComponent
  ]
})
export class SharedTimesheetModule { }
