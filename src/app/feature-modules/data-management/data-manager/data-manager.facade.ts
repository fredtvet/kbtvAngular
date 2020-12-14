import { Injectable } from "@angular/core";
import { Model } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { ModelCommand } from '@model/model-command.enum';
import { Prop } from '@state/interfaces';
import { ComponentStore } from '@state/component.store';
import { Store } from '@state/store';
import { Observable } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { ComponentState } from '../interfaces/component-state.interface';
import { DataConfig } from '../interfaces/data-config.interface';
import { UpdateSelectedPropertyAction } from './state/update-selected-property.reducer';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { DeleteModelAction } from '@model/state/delete-model/delete-model.action';

@Injectable()
export class DataManagerFacade  {

    properties: Prop<ModelState>[] = 
        ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"];

    selectedProperty$ = this.componentStore.selectProperty$<Prop<ModelState>>("selectedProperty");

    dataConfig$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        switchMap(x => this.getDataConfig$(x)));

    get selectedProperty() {
        return this.componentStore.selectProperty<Prop<ModelState>>("selectedProperty");
    }

    constructor(
        private store: Store<ModelState>,
        private componentStore: ComponentStore<ComponentState>
    ) { }

    updateSelectedProperty = (prop: Prop<ModelState>) => 
        this.componentStore.dispatch(<UpdateSelectedPropertyAction>{ type: UpdateSelectedPropertyAction, selectedProperty: prop })

    update = (form: Model): void =>
        this.store.dispatch(_formToSaveModelConverter({
            stateProp: this.selectedProperty, 
            saveAction: ModelCommand.Update,
            formValue: form
        }))
    
  
    delete = (payload: {id?: string, ids?: string[]}): void => 
        this.store.dispatch(<DeleteModelAction<ModelState>>{ 
            type: DeleteModelAction, 
            stateProp: this.selectedProperty, 
            payload 
        });
 
    private getDataConfig$(property: Prop<ModelState>): Observable<DataConfig>{        
        let relationCfg = new GetWithRelationsConfig(property, null, "all");
        return this.store.select$(relationCfg.includedProps).pipe(
            map(state => { 
            return {
                data: state[property],
                foreigns: state,
                selectedProp: property
            }
        }));
    }
}