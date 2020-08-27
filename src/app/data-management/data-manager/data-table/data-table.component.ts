import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { translations } from 'src/app/shared-app/translations';
import { ObjectHelperService } from 'src/app/core/services';
import { DataTableConfig } from './data-table.config';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @ViewChild('dataGrid') dataGrid: AgGridAngular;

  @Input() data: any[];

  @Output() itemEdited = new EventEmitter();
  @Output() itemsDeleted = new EventEmitter();
  @Output() createItem = new EventEmitter();

  columnDefs: any = [];
  rowData: any = [];

  private currentObject: Object;

  constructor(private _dialog: MatDialog, private objectHelperService: ObjectHelperService) { }

  ngOnChanges(){ this.initNgGrid(this.data); }

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
    if(!this.objectHelperService.hasSameObjectProps(data[0], this.currentObject)){
      this.columnDefs = [{colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true}];
      this.currentObject = data[0];
      Object.keys(data[0]).forEach(name => this.addColumnDef(name));
    }

    this.rowData = data;
  }

  private addColumnDef(name: string): void{
    let nameLower = name.toLowerCase();

    if(DataTableConfig.ignoredProperties.includes(nameLower)) return; //Ignored properties

    let def = {
      field: name,
      headerName: translations[nameLower] || nameLower,
      sortable: true,
      resizable: true,
      editable: true,
      lockPosition: true
    };

    if(DataTableConfig.booleanProperties.includes(nameLower)){
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

    if(DataTableConfig.noEditProperties.includes(nameLower)) def['editable'] = false;

    if(DataTableConfig.objectProperties.includes(nameLower)){
      def['valueGetter'] = function(params) { //Get name of object and display
        if(params.data[name])
          return params.data[name].name;
        else return ''
      };

    }

    this.columnDefs.push(def);
  }
  
}
