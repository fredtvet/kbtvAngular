import { Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

export abstract class AgGridTableComponent<TData> {
  @ViewChild('dataGrid') dataGrid: AgGridAngular;

  @Input() data: TData[];

  columnDefs: any = [];

  rowData: any = [];

  private currentObject: TData;

  constructor() { }

  ngOnChanges(): void {
    this.initNgGrid(this.data)
  }

  autoSizeGrid(){
    let cols = this.dataGrid.columnApi.getAllColumns().filter(x => x.getColId() != 'checkbox')
    this.dataGrid.columnApi.autoSizeColumns(cols);
  }

  protected abstract addColDefs(object: Object): any[];

  protected initNgGrid(data: TData[]): void{
    
    if(!data || data.length === 0){ //Reset grid if no data
      this.columnDefs = [];
      this.rowData = [];
      return;
    };

    if(!this.hasSameObjectProps(data[0], this.currentObject)){
      this.currentObject = data[0];
      this.columnDefs = this.addColDefs(data[0])   
    }

    this.rowData = data;
  }

  private hasSameObjectProps(obj1: Object, obj2: Object): boolean{
    let objProps1 = Object.keys(obj1 || {});

    if(objProps1.length !== Object.keys(obj2 || {}).length) return false;

    for(const prop of objProps1){
      if(!obj2.hasOwnProperty(prop)) return false   
    }

    return true;
  }


}