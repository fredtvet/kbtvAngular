import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  TimesheetCardComponent,
  TimesheetSummaryCardContentComponent, WeekFilterViewComponent
} from './components';
import { IonDatePickerComponent } from './components/ion-date-picker.component';
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
    IonDatePickerComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
    TimesheetFilterViewComponent,
    TimesheetCardComponent,
    WeekFilterViewComponent,
    TimesheetSummaryCardContentComponent,
    GetDateByDateParamsPipe,   
    ArrayIncludesPipe,
    ReadableDurationPipe,
    IonDatePickerComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedTimesheetModule { }
