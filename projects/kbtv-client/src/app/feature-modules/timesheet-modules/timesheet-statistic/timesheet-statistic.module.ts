import { NgModule } from '@angular/core';
import { TimesheetStatisticRoutingModule } from './timesheet-statistic-routing.module';

import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';
import { TimesheetStatisticTableComponent } from './timesheet-statistic/timesheet-statistic-table/timesheet-statistic-table.component';

import { AppAgGridModule } from 'src/app/app-ag-grid/app-ag-grid.module';
import { DatePipe } from '@angular/common';
import { SharedTimesheetModule } from '../shared-timesheet/shared-timesheet.module';
import { DynamicFormsModule } from '@dynamic-forms/dynamic-forms.module';
import { FetchTimesheetProviders } from '../shared-timesheet/state/providers.const';
import { FetchModelsProviders } from 'state-model';


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
    DynamicFormsModule,
  ],
})
export class TimesheetStatisticModule { }
