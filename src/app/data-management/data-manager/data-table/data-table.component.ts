import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslationService } from 'src/app/core/services';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { BaseEntity } from 'src/app/core/models';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @ViewChild('dataGrid') dataGrid: AgGridAngular;

  _data: BaseEntity[];
  get data(): BaseEntity[] {return this._data}

  @Input('data')
  set data(value: BaseEntity[]) {
      this._data = value;
      this.initNgGrid(value)
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

  constructor(
    private _dialog: MatDialog,
    private translationService: TranslationService) { }

  autoSizeGrid(){
    let cols = this.dataGrid.columnApi.getAllColumns().filter(x => x.getColId() != 'checkbox')
    this.dataGrid.columnApi.autoSizeColumns(cols);
  }

  editCell = (e:any) => this.itemEdited.emit(e);

  openDeleteDialog = () => {
    let nodes = this.dataGrid.api.getSelectedNodes();
    if(nodes.length == 0) return null;
    
    let config: ConfirmDialogConfig = {message: 'Slett ressurs(er)?', confirmText: 'Slett'};
    const deleteDialogRef = this._dialog.open(ConfirmDialogComponent, {data: config});

    deleteDialogRef.afterClosed().pipe(filter(res => res))
      .subscribe(res =>  this.itemsDeleted.emit(nodes.map(node => node.data['id'])));
  }

  private initNgGrid = (data: BaseEntity[]) => {
    this.columnDefs = [];
    this.rowData = [];

    if(!data || data.length == 0) return null;

    this.columnDefs.push({colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true})
    //Add cols for properties
    Object.getOwnPropertyNames(data[0])
      .forEach(name => this.addColumnDef(name));

    this.rowData = data;
  }

  private addColumnDef(name: string){
    let nameLower = name.toLowerCase();

    if(this.ignoredProperties.includes(nameLower)) return false; //Ignored properties

    let def = {
      field: name,
      headerName: this.translationService.translateProperty(nameLower),
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
