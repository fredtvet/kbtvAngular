import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimesheetSummary } from 'src/app/shared/interfaces';
import { translations } from 'src/app/shared-app/translations';
import { AgGridTableComponent } from 'src/app/shared/components/abstracts/ag-grid-table.component';

@Component({
  selector: 'app-timesheet-statistic-table',
  templateUrl: './timesheet-statistic-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticTableComponent extends AgGridTableComponent<TimesheetSummary> {

  constructor(private datePipe: DatePipe) { super() }

  protected addColDefs(object: Object): any[]{
    const columnDefs = [];
    if(object['year'])
      columnDefs.push({field: 'year', headerName: translations['year'] || 'year', sortable: true});

    if(object['month'])
      columnDefs.push({field: 'month',headerName: translations['month'] || 'month', sortable: true, valueFormatter: this.convertMonthIndex});

    if(object['week'])
      columnDefs.push({field: 'week',headerName: translations['week'] || 'week',sortable: true});

    if(object['date'])
      columnDefs.push({field: 'date',headerName: translations['date'] || 'date',sortable: true, valueFormatter: this.convertDate});

    columnDefs.push({field: 'fullName',headerName: translations['fullName'] || 'fullName',sortable: true});

    columnDefs.push({field: 'confirmedHours',headerName: translations['confirmedHours'] || 'confirmedHours',sortable: true});

    columnDefs.push({field: 'openHours',headerName: translations['openHours'] || 'openHours',sortable: true});

    return columnDefs;
  }

  private convertMonthIndex = (params) => 
    params?.value ? this.datePipe.transform(new Date().setMonth(params.value), 'MMM') : undefined;

  private convertDate = (params) => 
    params?.value ? this.datePipe.transform(params.value) : undefined;

}