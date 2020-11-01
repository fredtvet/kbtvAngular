import { NgModule } from '@angular/core';
import { TimesheetStatisticRoutingModule } from './timesheet-statistic-routing.module';

import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';
import { TimesheetStatisticTableComponent } from './timesheet-statistic/timesheet-statistic-table/timesheet-statistic-table.component';

import { AppAgGridModule } from 'src/app/app-ag-grid/app-ag-grid.module';
import { DatePipe } from '@angular/common';
import { TimesheetStatisticStore } from './timesheet-statistic.store';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { DynamicFormsModule } from 'src/app/dynamic-forms/dynamic-forms.module';


@NgModule({
  declarations: [
    TimesheetStatisticComponent,
    TimesheetStatisticTableComponent
  ],
  providers:[
    DatePipe,
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetStatisticRoutingModule,
    AppAgGridModule,
    DynamicFormsModule,
  ],
})
export class TimesheetStatisticModule { }
