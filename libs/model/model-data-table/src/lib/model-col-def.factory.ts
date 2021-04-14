import { Inject, Injectable } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { _convertArrayToObject } from "array-helpers";
import { Immutable, Maybe, UnknownState } from "global-types";
import { Store } from "state-management";
import { ModelCommand, ModelStateConfig, SaveModelAction, UnknownModelState } from 'model/state';
import { MODEL_DATA_TABLES_CONFIG, MODEL_NAME_TRANSLATIONS } from "./injection-tokens.const";
import { ModelDataTable, ModelDataTablesConfig, ModelNameTranslations } from "./interfaces";

@Injectable({providedIn: 'any'})
export class ModelColDefFactory {

    private checkBox = {colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true};
    
    private fkModelIdMap: {[foreignKey: string]: {[id: string]: Maybe<Immutable<UnknownState>>}} = {}

    private fkModelDisplayPropMap: {[foreignKey: string]: {[displayProp: string]: Maybe<Immutable<UnknownState>>}} = {}

    constructor(
        @Inject(MODEL_DATA_TABLES_CONFIG) private tableConfigs: ModelDataTablesConfig<UnknownModelState>,
        @Inject(MODEL_NAME_TRANSLATIONS) private translations: ModelNameTranslations,
        private store: Store<UnknownModelState>
    ){}

    createColDefs(stateProp: string): ColDef[]{
        const table = this.tableConfigs.tables[stateProp];
        if(!table) return [];
        this.createLookupMaps(stateProp);

        const colDefs: ColDef[] = [];

        if(table.selectable) colDefs.push(this.checkBox)

        for(const prop in table.propertyColDefs)   
            colDefs.push(this.getColDef(prop, stateProp, table, this.tableConfigs.baseColDef))
        
        return colDefs;
    }

    private getColDef( modelProp: string, stateProp: string, table: ModelDataTable<UnknownState>, baseColDef: ColDef): ColDef {
        const propDef = table.propertyColDefs[modelProp]

        let def: ColDef = {
            ...baseColDef,
            field: modelProp,
            headerName: this.translations[modelProp?.toLowerCase()] || modelProp,
            valueSetter: (params) => {      
                const updatedModel =  {...params.data, [modelProp]: params.newValue};
                this.dispatchUpdateAction(updatedModel, stateProp, table)
                return true
            }
        };

        if(propDef.boolean){
            def['cellEditor'] = 'agSelectCellEditor';
            def['cellEditorParams'] = { values: ['Ja', 'Nei'] }

            def['valueGetter'] = function(params){ return params.data[modelProp] === true ? 'Ja' : 'Nei' }

            def['valueSetter'] = (params) => {
                let val = params.newValue.toLowerCase();
                const res = val === 'ja' ? true : false;
                const updatedModel = {...params.data, [modelProp]: res};
                this.dispatchUpdateAction(updatedModel, stateProp, table)
                return true;
                
            } 
        }

        if(propDef.editable) def['editable'] = propDef.editable;

        const fkModelCfg = ModelStateConfig.getBy(modelProp, "foreignKey");

        if(fkModelCfg){
            const fkIdProp = modelProp;

            if(this.fkModelIdMap[fkIdProp]){
                def['cellEditor'] = 'agSelectCellEditor';
                def['cellEditorParams'] = { 
                    values: Object.keys(this.fkModelDisplayPropMap[fkIdProp] || {}), 
                }
    
                
                def['valueGetter'] = (params) => { //Get name of foreign obj and display
                    const fkId = params.data[fkIdProp];
                    if(fkId){
                        const fkEntity = this.fkModelIdMap[fkIdProp][fkId];
                        return fkEntity ? fkEntity[fkModelCfg.displayProp || fkModelCfg.idProp] : null;
                    }
                    else return ''
                };
    
                def['valueSetter'] = (params) => {
                    const hit = this.fkModelDisplayPropMap[fkIdProp][params.newValue];
                    if(!hit) return false;
                    const updatedModel = {...params.data, [fkIdProp]: hit[fkModelCfg.idProp]};
                    this.dispatchUpdateAction(updatedModel, stateProp, table)
                    return true;
                }
            }
            else def['editable'] = false;      
        }

        return def;
    }

    private createLookupMaps(property: string){
        const modelCfg = ModelStateConfig.get(property);
        if(modelCfg?.foreigns){
          for(const fkStateKey of modelCfg.foreigns){
            const fkCfg = ModelStateConfig.get(fkStateKey);
            const entities = this.store.state[fkStateKey];
            if(entities){
              this.fkModelIdMap[<string> fkCfg.foreignKey] = 
                _convertArrayToObject(entities, fkCfg.idProp);
              this.fkModelDisplayPropMap[<string> fkCfg.foreignKey] = 
                _convertArrayToObject(entities, fkCfg.displayProp);
            }
          };
        }
    }

    private dispatchUpdateAction(entity: UnknownState, stateProp: string, table: ModelDataTable<UnknownState>): void{
        if(table.onUpdateActionConverter) 
            this.store.dispatch(table.onUpdateActionConverter(entity))
        else 
            this.store.dispatch(<SaveModelAction<unknown, unknown>>{
                type: SaveModelAction, entity, stateProp, saveAction: ModelCommand.Update
            })
    }
}