import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { Model } from "src/app/core/models";
import {
    ApiService,
    ArrayHelperService
} from "src/app/core/services";
import { BaseModelFormStore } from '../core/model/form';
import { DeleteModelStateCommand, SaveModelStateCommand } from '../core/model/interfaces';
import { GetRangeWithRelationsHelper } from '../core/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from '../core/model/state-helpers/get-with-relations.config';
import { DeleteModelToStateHttpConverter } from '../core/services/model/converters/delete-model-to-state-http.converter';
import { SaveModelToStateHttpConverter } from '../core/services/model/converters/save-model-to-state-http.converter';
import { BaseModelStore } from '../core/state/abstracts/base-model.store';
import { StoreState } from './interfaces/store-state';

@Injectable({
  providedIn: 'any',
})
export class DataManagementStore extends BaseModelStore<StoreState>  {

    properties:(keyof Partial<StoreState>)[] = 
        ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"];

    selectedProperty$ = this.property$<keyof StoreState>("selectedProperty");

    data$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        filter(x => x != null), 
        switchMap(x => this.getData$(x)));

    get selectedProperty() {
        return this.getStateProperty<keyof StoreState>("selectedProperty")
    }

    constructor(
        apiService: ApiService,
        arrayHelperService: ArrayHelperService,   
        private saveStateHttpConverter: SaveModelToStateHttpConverter<StoreState, SaveModelStateCommand<Model>>,
        private deleteStateHttpConverter: DeleteModelToStateHttpConverter<StoreState, DeleteModelStateCommand>, 
        private getRangeWithRelationsHelper: GetRangeWithRelationsHelper<StoreState>
    ) {
        super( arrayHelperService, apiService);
    }

    updateSelectedProperty = (prop: keyof StoreState) => this._setStateVoid({selectedProperty: prop})

    save = (command: SaveModelStateCommand<Model>): void =>{
        command.stateProp = this.selectedProperty;
        this._stateHttpCommandHandler(this.saveStateHttpConverter.convert(command));
    }
  
    delete = (command: DeleteModelStateCommand): void => {
        command.stateProp = this.selectedProperty;
        this._stateHttpCommandHandler(this.deleteStateHttpConverter.convert(command));
    }

    private getData$(property: keyof StoreState): Observable<Model[]>{        
        let relationCfg = new GetWithRelationsConfig(property, null, {includeAll: true});

        return combineLatest([
            this.modelProperty$(property), //Combine with modelprop to fetch from server if no neccesary
            this.stateSlice$(relationCfg.includedForeignProps as any)
        ]).pipe(map(([entities, state]) => { 
            state = state || {};
            state[property] = entities as any;
            return this.getRangeWithRelationsHelper.get<Model>(state as any, relationCfg);
        }));
    }
}