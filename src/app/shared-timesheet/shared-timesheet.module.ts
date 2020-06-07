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
  ],
  exports: [
    SharedModule,
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
