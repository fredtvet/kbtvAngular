import { NgModule } from '@angular/core';
import { TimesheetStatisticRoutingModule } from './timesheet-statistic-routing.module';

import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';
import { TimesheetStatisticTableComponent } from './timesheet-statistic/timesheet-statistic-table/timesheet-statistic-table.component';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { AppAgGridModule } from 'src/app/app-ag-grid/app-ag-grid.module';


@NgModule({
  declarations: [
    TimesheetStatisticComponent,
    TimesheetStatisticTableComponent
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetStatisticRoutingModule,
    AppAgGridModule
  ],
})
export class TimesheetStatisticModule { }
