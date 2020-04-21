import { Component, ViewChild, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { TimesheetSummary } from 'src/app/shared/interfaces';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-statistic-table',
  templateUrl: './timesheet-statistic-table.component.html',
  styleUrls: ['./timesheet-statistic-table.component.scss']
})
export class TimesheetStatisticTableComponent {
  @ViewChild('dataGrid', {static: false}) dataGrid: AgGridAngular;

  @Input() users: User[] = [];

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

  constructor(private datePipe: DatePipe) { }

  autoSizeGrid(){
    let cols = this.dataGrid.columnApi.getAllColumns().filter(x => x.getColId() != 'checkbox')
    this.dataGrid.columnApi.autoSizeColumns(cols);
  }

  private initNgGrid(data: TimesheetSummary[]){
    console.log(data);
    this.columnDefs = [];
    this.rowData = [];

    if(data.length == 0) return null;

    const propertyNames = Object.getOwnPropertyNames(data[0]); 

    //this.columnDefs.push({colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true})
    
    if(propertyNames.includes('year'))
      this.columnDefs.push({field: 'year',headerName: 'År',sortable: true,resizable: true,lockPosition: true});

    if(propertyNames.includes('month'))

      this.columnDefs.push({field: 'month',headerName: 'Måned',sortable: true,resizable: true,lockPosition: true, 
        valueFormatter: this.convertMonthIndex});

    if(propertyNames.includes('weekNr'))
      this.columnDefs.push({field: 'weekNr',headerName: 'Uke',sortable: true,resizable: true,lockPosition: true});

    if(propertyNames.includes('date'))
      this.columnDefs.push({field: 'date',headerName: 'Dato',sortable: true,resizable: true,lockPosition: true,
        valueFormatter: this.convertDate});

    this.columnDefs.push({field: 'userName',headerName: 'Bruker',sortable: true,resizable: true,lockPosition: true,
      valueFormatter: this.convertUserNameToFullName});

    this.columnDefs.push({field: 'totalHours',headerName: 'Timer',sortable: true,resizable: true,lockPosition: true});



    this.rowData = data;
  }

  private convertMonthIndex = (params) => {
    return this.datePipe.transform(params.value, 'MMM');
  }

  private convertDate = (params) => {
    return this.datePipe.transform(params.value)
  }

  private convertUserNameToFullName = (params) => {
    const user = this.users.find(x => x.userName == params.value);
    return user.lastName + ', ' + user.firstName;
  }
}