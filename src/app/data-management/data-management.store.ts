import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap, tap } from "rxjs/operators";
import { Employer, Mission, MissionType } from "src/app/core/models";
import {
    ApiService,
    ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from '../core/state';
import { ModelState } from '../core/state/global.state';
import { ModelStateSettings } from '../core/state/model-state.settings';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class DataManagementStore extends BaseModelStore<StoreState>  {

    properties = ["missions", "employers", "missionTypes", "documentTypes", "inboundEmailPasswords"] as (keyof Partial<ModelState>)[];

    selectedProperty$ = this.property$<keyof StoreState>("selectedProperty");

    data$ = this.selectedProperty$.pipe(
        distinctUntilChanged(), 
        filter(x => !this._isNullOrUndefined(x)), 
        switchMap(x => this.getData$(x)));

    get selectedProperty() {
        return this.getProperty<keyof StoreState>("selectedProperty")
    }

    constructor(
        apiService: ApiService,
        arrayHelperService: ArrayHelperService
    ) {
        super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
    }

    updateSelectedProperty = (prop: keyof StoreState) => this._setStateVoid({selectedProperty: prop})

    add$<T>(entity: T): Observable<void> {
        let propInfo = ModelStateSettings[this.selectedProperty];
        return this.apiService.post(`${propInfo.apiUrl}`, entity)    
            .pipe(
            tap(newEntity => this._updateStateProperty(
                this.selectedProperty,
                GenericAction.Add + this.selectedProperty, 
                (arr: T[]) => this.arrayHelperService.add(arr, newEntity)))
            );   
    }

    update$<T>(entity: T): Observable<void> {
        let propInfo = ModelStateSettings[this.selectedProperty];
        return this.apiService.put(`${propInfo.apiUrl}/${entity[propInfo.identifier]}`, entity)    
            .pipe(
            tap(x => this._updateStateProperty(
                this.selectedProperty,
                GenericAction.Update + this.selectedProperty, 
                (arr: T[]) => this.arrayHelperService.update(arr, entity, propInfo.identifier)))
            );   
    }

    deleteRange$<T>(ids: number[]): Observable<void> {
        return this.apiService.post(`${ModelStateSettings[this.selectedProperty].apiUrl}/DeleteRange`, {Ids: ids})    
            .pipe(
            tap(x => this._updateStateProperty(
                this.selectedProperty,
                GenericAction.DeleteRange + this.selectedProperty, 
                (arr: T[]) => this.arrayHelperService.removeRangeByIdentifier(arr, ids, 'id')))
            );   
    }

    private getData$(property: keyof StoreState): Observable<any[]>{ 
        if(property === "missions") return this.getAllMissions$();
        if(ModelStateSettings[property].notPersisted) return super._propertyWithFetch$(property, this._fetchData$(property))
        return this.property$(property);
    }

    protected _fetchData$ = <T>(property: string): Observable<T> =>
        this.apiService.get(`${ModelStateSettings[property].apiUrl}`)
    
    private getAllMissions$(): Observable<Mission[]>{
        return combineLatest(
            this.property$<Mission[]>("missions"),
            this.property$<Employer[]>("employers"),
            this.property$<MissionType[]>("missionTypes")
        ).pipe(map(([missions, employers, types]) => {  
        if(this._isNullOrUndefined(missions) || missions.length == 0) return missions;
        let employersObj = this.arrayHelperService.convertArrayToObject(employers, 'id');
        let typesObj = this.arrayHelperService.convertArrayToObject(types, 'id');
     
        for(var i = 0; i < missions.length; i++){
            let mission = missions[i];
            mission.employer = employersObj[mission.employerId];    
            mission.missionType = typesObj[mission.missionTypeId];
            missions[i] = mission;
        }
        return missions
        }));
    } 
}

export enum GenericAction {
  DeleteRange = "deleteRange_",
  Update = "update_",
  Add = "add_",
}