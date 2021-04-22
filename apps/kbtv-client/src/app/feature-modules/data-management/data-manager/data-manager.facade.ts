import { Injectable } from "@angular/core";
import { Model } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { translations } from "@shared-app/translations";
import { ConfirmDialogService } from "confirm-dialog";
import { Prop } from "global-types";
import { ModelFormService } from 'model/form';
import { ComponentStore, Store } from 'state-management';
import { DeleteModelAction } from 'model/state-commands';
import { ComponentState } from '../interfaces/component-state.interface';
import { PropertyFormMap } from "./property-form.map";
import { UpdateSelectedPropertyAction } from './state/update-selected-property.reducer';

@Injectable()
export class DataManagerFacade  {

    properties: Prop<ModelState>[] = 
        ["missions", "employers", "missionTypes", "inboundEmailPasswords"];

    selectedProperty$ = this.componentStore.selectProperty$("selectedProperty");

    get selectedProperty() {
        return this.componentStore.state.selectedProperty;
    }

    constructor(
        private store: Store<ModelState>,
        private componentStore: ComponentStore<ComponentState>,     
        private confirmService: ConfirmDialogService,
        private formService: ModelFormService
    ) { }

    updateSelectedProperty = (prop: Prop<ModelState>) => 
        this.componentStore.dispatch(<UpdateSelectedPropertyAction>{ type: UpdateSelectedPropertyAction, selectedProperty: prop })
    
    createItem = (): void => {
        this.selectedProperty ? 
        this.formService.open<ModelState, Model>({formConfig: {
          stateProp: this.selectedProperty,    
          dynamicForm: PropertyFormMap[this.selectedProperty]
        }}) : undefined
    }

    deleteItems = (ids?: string[]): void =>{ 
        if(!ids?.length) return;
        const translatedProp = translations[<string> this.selectedProperty?.toLowerCase()]?.toLowerCase();
        this.confirmService.open({
          title: `Slett ${ids.length > 1 ? 'ressurser' : 'ressurs'}?`,
          message: `Bekreft at du ønsker å slette ${ids.length} ${translatedProp}`,  
          confirmText: 'Slett',
          confirmCallback: () => this._deleteItems(ids)
        })
    }

    private _deleteItems(ids: string[]): void{
        this.store.dispatch(<DeleteModelAction<ModelState>>{ 
            type: DeleteModelAction, 
            stateProp: this.selectedProperty, 
            payload: {ids} 
        });
    }
}