import { Injectable } from "@angular/core";
import { Model } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { ModelCommand } from '@model/model-command.enum';
import { ModelStateConfig } from "@model/model-state.config";
import { DeleteModelAction } from '@model/state/delete-model/delete-model.action';
import { FetchModelsAction } from "@model/state/fetch-model/fetch-models.http.effect";
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { Immutable, Prop } from "global-types";
import { Observable, of } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { ComponentStore, Store } from 'state-management';
import { ComponentState } from '../interfaces/component-state.interface';
import { DataConfig } from '../interfaces/data-config.interface';
import { UpdateSelectedPropertyAction } from './state/update-selected-property.reducer';

@Injectable()
export class DataManagerFacade  {

    properties: Prop<ModelState>[] = 
        ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"];

    selectedProperty$ = this.componentStore.selectProperty$<Prop<ModelState>>("selectedProperty");

    dataConfig$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        switchMap(x => x ? this.getDataConfig$(x) : of(undefined)));

    get selectedProperty() {
        return this.componentStore.state.selectedProperty;
    }

    constructor(
        private store: Store<ModelState>,
        private componentStore: ComponentStore<ComponentState>
    ) { }

    updateSelectedProperty = (prop: Prop<ModelState>) => {
        this.componentStore.dispatch(<UpdateSelectedPropertyAction>{ type: UpdateSelectedPropertyAction, selectedProperty: prop })
        this.store.dispatch(<FetchModelsAction<ModelState>>{ type: FetchModelsAction, props: [prop] })
    }

    update = (form: Model): void =>
        this.selectedProperty ? 
        this.store.dispatch(_formToSaveModelConverter({
                stateProp: this.selectedProperty, 
                saveAction: ModelCommand.Update,
                formValue: form
            })) : undefined
    
  
    delete = (payload: {id?: string, ids?: string[]}): void => 
        this.store.dispatch(<DeleteModelAction<ModelState>>{ 
            type: DeleteModelAction, 
            stateProp: this.selectedProperty, 
            payload 
        });
 
    private getDataConfig$(prop: Prop<Immutable<ModelState>>): Observable<DataConfig>{        
        const foreigns = ModelStateConfig.get(prop).foreigns
        return this.store.select$([prop, ...(foreigns || [])]).pipe(
            map(state => { 
            return {
                data: state ? state[prop] : undefined,
                foreigns: state || {},
                selectedProp: prop
            }
        }));
    }
}