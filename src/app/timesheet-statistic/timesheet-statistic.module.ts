import { NgModule } from '@angular/core';
import { TimesheetStatisticRoutingModule } from './timesheet-statistic-routing.module';
import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';

import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';
import { TimesheetFilterSheetWrapperComponent } from '../shared-timesheet/components';
import { TimesheetStatisticTableComponent } from './timesheet-statistic/timesheet-statistic-table/timesheet-statistic-table.component';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';


@NgModule({
  declarations: [
    TimesheetStatisticComponent,
    TimesheetStatisticTableComponent
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetStatisticRoutingModule,
    AppAgGridModule,
  ],
})
export class TimesheetStatisticModule { }
