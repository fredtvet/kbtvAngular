import { Injectable } from '@angular/core';
import { get, set, Store } from 'idb-keyval';
import { forkJoin, from, Observable, BehaviorSubject, throwError } from 'rxjs';
import { PersistedStateConfig, PersistedInitialStateConfig } from './persisted-state.config';
import { tap, filter, first, catchError, skip } from 'rxjs/operators';
import { BaseStore } from '../../state/abstracts/base.store';
import { ArrayHelperService } from '../utility/array-helper.service';
import { ApiService } from '../api.service';
import { StateLastAction } from '../../state';

const InitializeAction = "initalize_persistedState";

@Injectable({
  providedIn: 'root'
})
export class PersistanceStore extends BaseStore<Object & StateLastAction> {

    private stateInitalizedSubject = new BehaviorSubject<boolean>(false);
    stateInitalized$: Observable<boolean> = this.stateInitalizedSubject.asObservable().pipe(first(x => x === true));

    private dbStore: Store = new Store("kbtvDb", "state");

    constructor(        
        arrayHelperService: ArrayHelperService,
        apiService: ApiService) { 
        super(arrayHelperService, apiService);
    }

    init(): void{
        this.initalizeInitialState();
        this.initalizeState();

        this.globalStateWithPropertyChanges.pipe(
            filter(x => x != null && x.stateChanges.lastAction !== InitializeAction),
            tap(x => this.persistStateChanges(x.stateChanges))
        ).subscribe();
    }

    private set<T>(property: keyof typeof PersistedStateConfig, payload: T): void{
        this.removePayloadTempProps(payload);
        if(PersistedStateConfig[property]) 
            from(set(property, payload, this.dbStore))
                .subscribe(() => {}, err => console.log(err))
        else if(PersistedInitialStateConfig[property]) 
            window.localStorage.setItem(property as string, payload ? JSON.stringify(payload) : null)
    }

    private get$<T>(property: keyof typeof PersistedStateConfig): Observable<T>{
        return from(get<T>(property, this.dbStore))
    }

    private persistStateChanges = (stateChanges: Partial<Object>): void => {
        for(const prop in stateChanges){
            this.set(prop, stateChanges[prop]);
        }
    }

    private initalizeInitialState(): void{
        const state = {};
        for(var prop in PersistedInitialStateConfig){
            const value = window.localStorage.getItem(prop);
            state[prop] = JSON.parse(value);
        }
        this._setStateVoid(state, InitializeAction);
    }

    private initalizeState(): void{
        this.initalizePropsFromDb$(Object.keys(PersistedStateConfig))
            .subscribe(x => this.stateInitalizedSubject.next(true));
    }

    private initalizePropsFromDb$(props: string[]): Observable<any> {
        let propDbObservables = [];

        for(const prop of props){
            propDbObservables.push(this.get$(prop));
        }

        return forkJoin(propDbObservables).pipe(
            catchError(error => {console.log(error); return throwError(error)}),
            tap(state => this._setStateVoid(this.mapStateArrToStateObj(state, props), InitializeAction))
        )
    }

    private mapStateArrToStateObj(stateArr: any[], propsInOrder: string[]): Object{
        let stateObj = {};
        for(const index in propsInOrder){
            stateObj[propsInOrder[index]] = stateArr[index];
        }
        return stateObj;
    }

    private removePayloadTempProps<T>(payload: T): void{
        if(Array.isArray(payload) && payload.length > 0 && typeof payload[0] === "object") 
            for(var item of payload) this.removeObjectTempProps(item)
        else if(typeof payload === "object") this.removeObjectTempProps(payload);
    }

    private removeObjectTempProps<T extends Object>(obj: T): void{
        for(var key in obj){
            if(key.includes("temp_")) delete obj[key]
        }
    }
}



