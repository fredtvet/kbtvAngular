import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { 
  TimesheetCardComponent, 
  WeekListFilterComponent, 
  WeekListFilterSheetWrapperComponent, 
  TimesheetFilterComponent, 
  TimesheetFilterSheetWrapperComponent, 
  TimesheetSummaryCardContentComponent 
} from './components';
import { GetDateByDateParamsPipe, ArrayIncludesPipe, ReadableDurationPipe } from './pipes';
import { AppOwlDateTimeModule } from '../app-owl-date-time/app-owl-date-time.module';

@NgModule({
  declarations: [
    TimesheetCardComponent,
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    TimesheetFilterComponent,
    TimesheetFilterSheetWrapperComponent,
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
    TimesheetCardComponent,
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    TimesheetFilterComponent,
    TimesheetFilterSheetWrapperComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
  ]
})
export class SharedTimesheetModule { }
