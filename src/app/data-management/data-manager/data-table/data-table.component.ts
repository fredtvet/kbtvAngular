import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AgGridTableComponent } from 'src/app/app-ag-grid/ag-grid-table.component';
import { translations } from 'src/app/shared-app/translations';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableConfig } from './data-table.config';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent extends AgGridTableComponent<any> {

  @Output() itemEdited = new EventEmitter();
  @Output() itemsDeleted = new EventEmitter();
  @Output() createItem = new EventEmitter();

  columnDefs: any = [];
  rowData: any = [];

  constructor(private dialog: MatDialog) { super() }

  editCell = (e:any) => {
    if(e.newValue !== e.oldValue){
      this.itemEdited.emit(e);
    }
  };
  
  openDeleteDialog = () => {
    let nodes = this.dataGrid.api.getSelectedNodes();
    if(nodes?.length == 0) return null;
    
    let config: ConfirmDialogConfig = {message: 'Slett ressurs(er)?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});

    deleteDialogRef.afterClosed().pipe(filter(res => res))
      .subscribe(res =>  this.itemsDeleted.emit(nodes.map(node => node.data['id'])));
  }

  protected addColDefs(object: Object): any[]{
    const colDefs = [{colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true}];
    for(const prop in object){
      colDefs.push(this.addColumnDef(prop))
    }
    return colDefs;
  }

  private addColumnDef(name: string): any{
    let nameLower = name.toLowerCase();

    if(DataTableConfig.ignoredProperties[nameLower]) return; //Ignored properties

    let def = {
      field: name,
      headerName: translations[nameLower] || nameLower,
      sortable: true,
      resizable: true,
      editable: true,
      lockPosition: true
    };

    if(DataTableConfig.booleanProperties[nameLower]){
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

    if(DataTableConfig.noEditProperties[nameLower]) def['editable'] = false;

    if(DataTableConfig.objectProperties[nameLower]){
      def['valueGetter'] = function(params) { //Get name of object and display
        if(params.data[name])
          return params.data[name].name;
        else return ''
      };

    }

    return def;
  }
  
}
