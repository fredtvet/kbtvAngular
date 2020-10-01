import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Model } from 'src/app/core/models/base-entity.interface';
import { ModelConfig, ModelStateConfig, ModelStateConfigData } from 'src/app/core/services/model/model-state.config';
import { _convertArrayToObject } from 'src/app/shared-app/helpers/array/convert-array-to-object.helper';
import { AgGridTableComponent } from 'src/app/shared/components/abstracts/ag-grid-table.component';
import { translations } from 'src/app/shared/translations';
import { DataConfig } from '../../interfaces/data-config.interface';
import { DataTableConfig } from './data-table.config';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent extends AgGridTableComponent<Model, DataConfig> {

  @Output() itemEdited = new EventEmitter();

  columnDefs: any = [];
  rowData: any = [];

  //Create map with foreignProp as key, to lookup via model class properties
  private propCfgMap: {[foreignKey: string]: ModelConfig & {stateProp: string}} = {};
  private foreignsIdMap: {[foreignKey: string]: {[id: string]: Model}} = {}
  private foreignsDisplayMap: {[foreignKey: string]: {[displayProp: string]: Model}} = {}

  constructor() { 
    super(); 

    for(let modelKey in ModelStateConfigData){
      const modelCfg = ModelStateConfigData[modelKey];
      this.propCfgMap[modelCfg.foreignKey] = {...modelCfg, stateProp: modelKey};
    }
  }

  editCell = (e:any) => {
    if(e.newValue !== e.oldValue){
      this.itemEdited.emit(e);
    }
  };

  protected initNgGrid(cfg: DataConfig): void{
    if(!cfg) return super.initNgGrid(cfg);
    const modelCfg = ModelStateConfig.get(cfg.selectedProp);
    if(modelCfg.foreigns){
      for(const fkStateKey of modelCfg.foreigns){
        const fkCfg = ModelStateConfig.get(fkStateKey);
        const entities = cfg.foreigns[fkStateKey];
        if(entities){
          this.foreignsIdMap[fkCfg.foreignKey] = 
            _convertArrayToObject<Model>(entities, fkCfg.identifier);
          this.foreignsDisplayMap[fkCfg.foreignKey] = 
            _convertArrayToObject<Model>(entities, fkCfg.displayProp);
        }
      };
    }
    super.initNgGrid(cfg);
  }

  protected addColDefs(object: Object): any[]{
    const colDefs = [{colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true}];
    for(const prop in object){
      const colDef = this.addColDef(prop);
      if(colDef) colDefs.push(colDef)
    }
    return colDefs;
  }

  private addColDef(name: string): any{
    if(DataTableConfig.ignoredProperties[name]) return null; //Ignored properties

    let def = {
      field: name,
      headerName: translations[name] || name,
      sortable: true,
      resizable: true,
      editable: true,
      lockPosition: true
    };

    if(DataTableConfig.booleanProperties[name]){
      def['cellEditor'] = 'agSelectCellEditor';
      def['cellEditorParams'] = { values: ['Ja', 'Nei'] }

      def['valueGetter'] = function(params){return params.data[name] == true ? 'Ja' : 'Nei'}

      def['valueSetter'] = function(params){
        let val = params.newValue.toLowerCase();
        if(val == 'ja') params.data[name] = true;
        else if (val == 'nei') params.data[name] = false;
        else return false;
        return true;
      }
    }

    if(DataTableConfig.noEditProperties[name]) def['editable'] = false;

    const fkModelCfg = this.propCfgMap[name];

    if(fkModelCfg){
      const fkIdProp = name;

      def['cellEditor'] = 'agSelectCellEditor';
      def['cellEditorParams'] = { 
        values: Object.keys(this.foreignsDisplayMap[fkIdProp] || {}), 
      }

      def['valueGetter'] = (params) => { //Get name of fkId and display
        const fkId = params.data[fkIdProp];
        if(fkId){
          const fkEntity = this.foreignsIdMap[fkIdProp][fkId];
          return fkEntity ? fkEntity[fkModelCfg.displayProp || fkModelCfg.identifier] : null;
        }
        else return ''
      };

      def['valueSetter'] = (params) => {
        const hit = this.foreignsDisplayMap[fkIdProp][params.newValue]
        if(hit) params.data[fkIdProp] = hit[fkModelCfg.identifier];
        else return false;
        return true;
      }
    }

    return def;
  }
  
}
