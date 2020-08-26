import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { TimesheetSummary } from 'src/app/shared-app/interfaces';
import { translations } from 'src/app/shared-app/translations';

@Component({
  selector: 'app-timesheet-statistic-table',
  templateUrl: './timesheet-statistic-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticTableComponent {
  @ViewChild('dataGrid') dataGrid: AgGridAngular;

  _timesheetSummaries: TimesheetSummary[];
  get timesheetSummaries(): TimesheetSummary[] {
      return this._timesheetSummaries;
  }
  
  @Input('timesheetSummaries')
  set timesheetSummaries(value: TimesheetSummary[]) {
      this._timesheetSummaries = value;
      this.initNgGrid(this.timesheetSummaries);
  }

  columnDefs: any = [];

  rowData: any = [];

  private currentSummary: TimesheetSummary;

  constructor(private datePipe: DatePipe) { }

  autoSizeGrid(){
    let cols = this.dataGrid.columnApi.getAllColumns().filter(x => x.getColId() != 'checkbox')
    this.dataGrid.columnApi.autoSizeColumns(cols);
  }

  private initNgGrid(data: TimesheetSummary[]): void{
    
    if(!data || data.length === 0){ //Reset grid if no data
      this.columnDefs = [];
      this.rowData = [];
      return;
    };

    if(!this.hasSameObjectProps(data[0], this.currentSummary)){
      this.columnDefs = [];
      this.currentSummary = data[0];
      this.addColDefs(this.currentSummary);
    }

    let totalOpenHrs = data.reduce((total, summary) => { return total + summary.openHours }, 0);
    let totalConfirmedHrs = data.reduce((total, summary) => { return total + summary.confirmedHours }, 0);

    if(this.dataGrid){
      this.dataGrid.api.setPinnedBottomRowData([{openHours: totalOpenHrs, confirmedHours: totalConfirmedHrs, fullName: "Sum av timer", timesheets: []}]);
    }

    this.rowData = data;
  }

  private addColDefs(summary: TimesheetSummary){
    const propertyNames = Object.getOwnPropertyNames(summary); 

    if(propertyNames.includes('year'))
      this.columnDefs.push({field: 'year', headerName: translations['year'] || 'year', sortable: true});

    if(propertyNames.includes('month'))
      this.columnDefs.push({field: 'month',headerName: translations['month'] || 'month', sortable: true, valueFormatter: this.convertMonthIndex});

    if(propertyNames.includes('week'))
      this.columnDefs.push({field: 'week',headerName: translations['week'] || 'week',sortable: true});

    if(propertyNames.includes('date'))
      this.columnDefs.push({field: 'date',headerName: translations['date'] || 'date',sortable: true, valueFormatter: this.convertDate});

    this.columnDefs.push({field: 'fullName',headerName: translations['fullName'] || 'fullName',sortable: true});

    this.columnDefs.push({field: 'confirmedHours',headerName: translations['confirmedHours'] || 'confirmedHours',sortable: true});

    this.columnDefs.push({field: 'openHours',headerName: translations['openHours'] || 'openHours',sortable: true});
  }

  private hasSameObjectProps(obj1: Object, obj2: Object): boolean{
    let objProps1 = Object.keys(obj1 || {});

    if(objProps1.length !== Object.keys(obj2 || {}).length) return false;

    for(const prop of objProps1){
      if(!obj2.hasOwnProperty(prop)) return false   
    }

    return true;
  }

  private convertMonthIndex = (params) => 
    params?.value ? this.datePipe.transform(new Date().setMonth(params.value), 'MMM') : undefined;

  private convertDate = (params) => 
    params?.value ? this.datePipe.transform(params.value) : undefined;

}