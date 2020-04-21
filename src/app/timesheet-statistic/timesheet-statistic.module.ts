import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TimesheetStatisticRoutingModule } from './timesheet-statistic-routing.module';
import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';

import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';
import { TimesheetFilterSheetWrapperComponent } from '../shared/components';
import { TimesheetStatisticTableComponent } from './timesheet-statistic/timesheet-statistic-table/timesheet-statistic-table.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    TimesheetStatisticComponent,
    TimesheetStatisticTableComponent
  ],
  entryComponents:[
    TimesheetFilterSheetWrapperComponent
  ],
  providers: [
    DatePipe
  ],
  imports: [
    SharedModule,
    TimesheetStatisticRoutingModule,
    AppAgGridModule,
  ],
})
export class TimesheetStatisticModule { }
