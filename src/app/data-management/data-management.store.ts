import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { Model } from "src/app/core/models";
import { ApiService } from '../core/services/api.service';
import { FormToSaveModelStateCommandAdapter } from '../core/services/model/adapters/form-to-save-model-state-command.adapter';
import { ModelState } from '../core/services/model/interfaces';
import { GetWithRelationsConfig } from '../core/services/model/state-helpers/get-with-relations.config';
import { DeleteModelAction } from '../core/services/model/state/delete-model/delete-model-state-command.interface';
import { BaseModelStore } from '../core/services/state/abstracts/base-model.store';
import { CommandDispatcher } from '../core/services/state/command.dispatcher';
import { ObservableStoreBase } from '../core/services/state/observable-store-base';
import { StateAction } from '../core/services/state/state-action.enum';
import { Prop } from '../shared-app/prop.type';
import { DataConfig } from './interfaces/data-config.interface';
import { StoreState } from './interfaces/store-state';

@Injectable({
  providedIn: 'any',
})
export class DataManagementStore extends BaseModelStore<StoreState>  {

    properties: Prop<StoreState>[] = 
        ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"];

    selectedProperty$ = this.stateProperty$<Prop<ModelState>>("selectedProperty");

    dataConfig$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        switchMap(x => this.getDataConfig$(x)));

    get selectedProperty() {
        return this.getStateProperty<Prop<ModelState>>("selectedProperty")
    }

    constructor(
        apiService: ApiService,
        base: ObservableStoreBase,  
        private commandDispatcher: CommandDispatcher,
    ) {
        super(base, apiService);
    }

    updateSelectedProperty = (prop: Prop<ModelState>) => this.setState({selectedProperty: prop})

    update = (formState: Model): void =>
        this.commandDispatcher.dispatch(new FormToSaveModelStateCommandAdapter({
            stateProp: this.selectedProperty, 
            saveAction: StateAction.Update,
            formState,
        }))
    
  
    delete = (command: {id?: string, ids?: string[]}): void => 
        this.commandDispatcher.dispatch({
            ...command, 
            stateProp: this.selectedProperty, 
            action: DeleteModelAction
        });
 
    private getDataConfig$(property: Prop<ModelState>): Observable<DataConfig>{        
        let relationCfg = new GetWithRelationsConfig(property, null, {includeAll: true});
        return combineLatest([
            this.modelProperty$(property), //Combine with modelprop to fetch from server if no neccesary
            this.stateSlice$(relationCfg.includedForeignProps as any)
        ]).pipe(map(([entities, foreigns]) => { 
            const state = {...foreigns} || {};
            state[property] = entities as any;
            return {
                data: entities,
                foreigns,
                selectedProp: property
            }
        }));
    }
}