import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { Model } from "src/app/core/models";
import { ObservableStoreBase } from '../core/services/state/observable-store-base';
import { ApiService } from '../core/services/api.service';
import { DeleteModelToStateHttpConverter } from '../core/services/model/converters/delete-model-to-state-http.converter';
import { SaveModelToStateHttpConverter } from '../core/services/model/converters/save-model-to-state-http.converter';
import { StateHttpCommandHandler } from "../core/services/state/state-http-command.handler";
import { DataConfig } from './interfaces/data-config.interface';
import { StoreState } from './interfaces/store-state';
import { ModelState, SaveModelStateCommand, DeleteModelStateCommand } from '../core/services/model/interfaces';
import { GetWithRelationsConfig } from '../core/services/model/state-helpers/get-with-relations.config';
import { BaseModelStore } from '../core/services/state/abstracts/base-model.store';
import { Prop } from '../shared-app/prop.type';

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
        private stateHttpCommandHandler: StateHttpCommandHandler,
        private saveStateHttpConverter: SaveModelToStateHttpConverter<StoreState, SaveModelStateCommand<Model>>,
        private deleteStateHttpConverter: DeleteModelToStateHttpConverter<StoreState, DeleteModelStateCommand>
    ) {
        super(base, apiService);
    }

    updateSelectedProperty = (prop: Prop<ModelState>) => this.setState({selectedProperty: prop})

    save = (command: SaveModelStateCommand<Model>): void =>{
        command.stateProp = this.selectedProperty;
        this.stateHttpCommandHandler.dispatch(this.saveStateHttpConverter.convert(command));
    }
  
    delete = (command: DeleteModelStateCommand): void => {
        command.stateProp = this.selectedProperty;
        this.stateHttpCommandHandler.dispatch(this.deleteStateHttpConverter.convert(command));
    }

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