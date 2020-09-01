import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap, tap } from "rxjs/operators";
import { Mission } from "src/app/core/models";
import {
    ApiService,
    ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from '../core/state';
import { ModelState } from '../core/state/global.state';
import { ModelStateConfig } from '../core/state/model-state.config';
import { StoreState } from './interfaces/store-state';

@Injectable({
  providedIn: 'any',
})
export class DataManagementStore extends BaseModelStore<StoreState>  {

    properties = ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"] as (keyof Partial<ModelState>)[];
    noPersistProps = {inboundEmailPasswords: true};

    selectedProperty$ = this.property$<keyof StoreState>("selectedProperty");

    data$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        filter(x => x != null), 
        switchMap(x => this.getData$(x)));

    get selectedProperty() {
        return this.getProperty<keyof StoreState>("selectedProperty")
    }

    get propInfo() { return ModelStateConfig[this.selectedProperty] }

    constructor(
        apiService: ApiService,
        arrayHelperService: ArrayHelperService
    ) {
        super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
    }

    updateSelectedProperty = (prop: keyof StoreState) => this._setStateVoid({selectedProperty: prop})

    add$<T>(entity: T): Observable<void> {
        return this.apiService.post(`${this.propInfo.apiUrl}`, entity)    
            .pipe(
            tap(newEntity => this._updateStateProperty(
                this.selectedProperty, 
                (arr: T[]) => this.arrayHelperService.add(arr, newEntity)))
            );   
    }

    update$<T>(entity: T): Observable<void> {
        return this.apiService.put(`${this.propInfo.apiUrl}/${entity[this.propInfo.identifier]}`, entity)    
            .pipe(
            tap(x => this._updateStateProperty(
                this.selectedProperty, 
                (arr: T[]) => this.arrayHelperService.update(arr, entity, this.propInfo.identifier)))
            );   
    }

    delete$<T>(id: number): Observable<void> {
        return this.apiService.delete(`${this.propInfo.apiUrl}/${id}`)    
            .pipe(
            tap(x => this._updateStateProperty(
                this.selectedProperty,
                (arr: T[]) => this.arrayHelperService.removeByIdentifier(arr, id, 'id')))
            );   
    }

    deleteRange$<T>(ids: number[]): Observable<void> {
        return this.apiService.post(`${this.propInfo.apiUrl}/DeleteRange`, {Ids: ids})    
            .pipe(
            tap(x => this._updateStateProperty(
                this.selectedProperty,
                (arr: T[]) => this.arrayHelperService.removeRangeByIdentifier(arr, ids, 'id')))
            );   
    }

    private getData$(property: keyof StoreState): Observable<any[]>{ 
        if(property === "missions") return this.getAllMissions$();
        if(this.propInfo.notPersisted) return super._propertyWithFetch$(property, this._fetchData$(this.propInfo.apiUrl))
        return this.property$(property);
    }

    protected _fetchData$ = <T>(url: string): Observable<T> => this.apiService.get(`${url}`)
    
    private getAllMissions$(): Observable<Mission[]>{
        return this.stateSlice$(["missions", "employers", "missionTypes"]).pipe(
            map(({missions, employers, missionTypes}) => {  
                if(!missions || missions.length == 0) return missions;
    
                let employersObj = this.arrayHelperService.convertArrayToObject(employers, 'id');
                let typesObj = this.arrayHelperService.convertArrayToObject(missionTypes, 'id');
            
                for(var i = 0; i < missions.length; i++){
                    let mission = missions[i];
                    mission.employer = employersObj[mission.employerId];    
                    mission.missionType = typesObj[mission.missionTypeId];
                    missions[i] = mission;
                }
                return missions
            })
        );
    } 
}