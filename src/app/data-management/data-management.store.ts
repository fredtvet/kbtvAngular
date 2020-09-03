import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap, tap } from "rxjs/operators";
import { Mission, BaseEntity } from "src/app/core/models";
import {
    ApiService,
    ArrayHelperService
} from "src/app/core/services";
import { ModelState } from '../core/state/global.state';
import { StoreState } from './interfaces/store-state';
import { OptimisticModelFormStore } from '../core/state/abstractions/optimistic-model-form.store';
import { GetRangeWithRelationsHelper } from '../core/state/store-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from '../core/state/store-helpers/get-with-relations.config';
import { ModelStateSlice$ } from '../core/state/model-state-slice.type';

@Injectable({
  providedIn: 'any',
})
export class DataManagementStore extends OptimisticModelFormStore<StoreState>  {

    properties:(keyof Partial<StoreState>)[] = 
        ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"];

    selectedProperty$ = this.property$<keyof StoreState>("selectedProperty");

    data$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        filter(x => x != null), 
        switchMap(x => this.getData$(x)));

    get selectedProperty() {
        return this.getProperty<keyof StoreState>("selectedProperty")
    }

    constructor(
        apiService: ApiService,
        arrayHelperService: ArrayHelperService,
        private getRangeWithRelationsHelper: GetRangeWithRelationsHelper
    ) {
        super(arrayHelperService, apiService);
        this.selectedProperty$.subscribe(x => this.stateProp = x);
    }

    updateSelectedProperty = (prop: keyof StoreState) => this._setStateVoid({selectedProperty: prop})

    add$<T>(entity: T): Observable<void> {
        return this.apiService.post(`${this.propCfg.apiUrl}`, entity)    
            .pipe(
            tap(newEntity => this._updateStateProperty(
                this.selectedProperty, 
                (arr: T[]) => this.arrayHelperService.add(arr, newEntity)))
            );   
    }

    update$<T extends BaseEntity>(entity: T): Observable<void> {
        return this._update$(
            this.apiService.put(`${this.propCfg.apiUrl}/${entity[this.propCfg.identifier]}`, entity),
            entity
        ); 
    }

    delete$ = (id: number): Observable<void> => this._delete$(id); 

    deleteRange$ = (ids: number[]): Observable<void> => this._deleteRange$(ids) 
    
    private getData$(property: keyof StoreState): Observable<any[]>{ 
        if(this.propCfg.notPersisted) 
            return super._propertyWithFetch$(property, this.apiService.get(`${this.propCfg.apiUrl}`))

        return this.getRangeWithRelationsHelper.get$(
            this.stateSlice$ as ModelStateSlice$, 
            new GetWithRelationsConfig(property, null, {includeAll: true})
        );

    }
    
}