import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { Model } from "src/app/core/models";
import { GetWithRelationsConfig } from 'src/app/model/helpers/get-with-relations.config';
import { ModelState } from 'src/app/model/interfaces';
import { DeleteModelActionId } from 'src/app/model/state/delete-model/delete-model-action.const';
import { ActionType } from 'src/app/shared-app/enums';
import { Prop } from 'src/app/shared-app/prop.type';
import { FormToSaveModelStateCommandAdapter } from 'src/app/shared/model-form/adapters/form-to-save-model-state-command.adapter';
import { ComponentStore } from 'src/app/state/component.store';
import { Store } from 'src/app/state/store';
import { ComponentState } from '../interfaces/component-state.interface';
import { DataConfig } from '../interfaces/data-config.interface';
import { UpdateSelectedPropertyActionId } from './state/update-selected-property.reducer';

@Injectable()
export class DataManagerFacade  {

    properties: Prop<ModelState>[] = 
        ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"];

    selectedProperty$ = this.componentStore.selectProperty$<Prop<ModelState>>("selectedProperty");

    dataConfig$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        switchMap(x => this.getDataConfig$(x)));

    get selectedProperty() {
        return this.componentStore.selectProperty<Prop<ModelState>>("selectedProperty", false);
    }

    constructor(
        private store: Store<ModelState>,
        private componentStore: ComponentStore<ComponentState>
    ) { }

    updateSelectedProperty = (prop: Prop<ModelState>) => 
        this.componentStore.dispatch({actionId: UpdateSelectedPropertyActionId, selectedProperty: prop})

    update = (form: Model): void =>
        this.store.dispatch(new FormToSaveModelStateCommandAdapter({
            stateProp: this.selectedProperty, 
            saveAction: ActionType.Update,
            formState: form
        }))
    
  
    delete = (command: {id?: string, ids?: string[]}): void => 
        this.store.dispatch({
            ...command, 
            stateProp: this.selectedProperty, 
            actionId: DeleteModelActionId
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