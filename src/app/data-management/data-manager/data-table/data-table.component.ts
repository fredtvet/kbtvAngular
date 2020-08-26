import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { translations } from 'src/app/shared-app/translations';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @ViewChild('dataGrid') dataGrid: AgGridAngular;

  _data: any[];
  get data(): any[] {return this._data}

  @Input('data')
  set data(value: any[]) {
      this._data = value;
      this.initNgGrid(value);
  }

  @Output() itemEdited = new EventEmitter();
  @Output() itemsDeleted = new EventEmitter();
  @Output() createItem = new EventEmitter();

  columnDefs: any = [];

  rowData: any = [];
  
  ignoredProperties = ['updatedat', 'createdat', 'lastvisited', 'employerid', 'missiontypeid', 'imageurl'];
  
  noEditProperties = ['id', 'missiontype', 'employer', 'password'];
  
  booleanProperties = ['finished']
  
  objectProperties = ['missiontype', 'employer'];

  private currentObject: Object;

  constructor(private _dialog: MatDialog) { }

  autoSizeGrid(){
    let cols = this.dataGrid.columnApi.getAllColumns().filter(x => x.getColId() != 'checkbox')
    this.dataGrid.columnApi.autoSizeColumns(cols);
  }

  editCell = (e:any) => {
    if(e.newValue !== e.oldValue){
      this.itemEdited.emit(e);
    }
  };
  
  openDeleteDialog = () => {
    let nodes = this.dataGrid.api.getSelectedNodes();
    if(nodes?.length == 0) return null;
    
    let config: ConfirmDialogConfig = {message: 'Slett ressurs(er)?', confirmText: 'Slett'};
    const deleteDialogRef = this._dialog.open(ConfirmDialogComponent, {data: config});

    deleteDialogRef.afterClosed().pipe(filter(res => res))
      .subscribe(res =>  this.itemsDeleted.emit(nodes.map(node => node.data['id'])));
  }

  private initNgGrid = (data: Object[]): void => {
    
    if(!data || data === null || data.length === 0){ //Reset grid if no data
      this.columnDefs = [];
      this.rowData = [];
      return;
    };
   
    //Add cols for properties if obj is new 
    if(!this.hasSameObjectProps(data[0], this.currentObject)){
      this.columnDefs = [{colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true}];
      this.currentObject = data[0];
      Object.keys(data[0]).forEach(name => this.addColumnDef(name));
    }

    this.rowData = data;
  }

  private hasSameObjectProps(obj1: Object, obj2: Object): boolean{
    let objProps1 = Object.keys(obj1 || {});

    if(objProps1?.length !== Object.keys(obj2 || {})?.length) return false;

    for(const prop of objProps1){
      if(!obj2.hasOwnProperty(prop)) return false   
    }

    return true;
  }


  private addColumnDef(name: string): void{
    let nameLower = name.toLowerCase();

    if(this.ignoredProperties.includes(nameLower)) return; //Ignored properties

    let def = {
      field: name,
      headerName: translations[nameLower] || nameLower,
      sortable: true,
      resizable: true,
      editable: true,
      lockPosition: true
    };

    if(this.booleanProperties.includes(nameLower)){
      def['cellEditor'] = 'agSelectCellEditor';
      def['cellEditorParams'] = { values: ['Ja', 'Nei']}

      def['valueGetter'] = function(params){return params.data[name] == true ? 'Ja' : 'Nei'}

      def['valueSetter'] = function(params){

        let val = params.newValue.toLowerCase();
        if(val == 'ja') params.data[name] = true;
        else if (val == 'nei') params.data[name] = false;
        else return false;
        return true;
      }
    }

    if(this.noEditProperties.includes(nameLower)) def['editable'] = false;

    if(this.objectProperties.includes(nameLower)){
      def['valueGetter'] = function(params) { //Get name of object and display
        if(params.data[name])
          return params.data[name].name;
        else return ''
      };

    }

    this.columnDefs.push(def);
  }
  
}
