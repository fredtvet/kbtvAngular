import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppAgGridModule } from 'src/app/app-ag-grid/app-ag-grid.module';
import { FetchModelsProviders } from 'state-model';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { FetchTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { TimesheetStatisticRoutingModule } from './timesheet-statistic-routing.module';
import { TimesheetStatisticTableComponent } from './timesheet-statistic/timesheet-statistic-table/timesheet-statistic-table.component';
import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';




@NgModule({
  declarations: [
    TimesheetStatisticComponent,
    TimesheetStatisticTableComponent
  ],
  providers:[
    DatePipe,
    ...FetchTimesheetProviders,
    ...FetchModelsProviders
  ],
  imports: [
    SharedTimesheetModule,
    TimesheetStatisticRoutingModule,
    AppAgGridModule,
  ],
})
export class TimesheetStatisticModule { }
