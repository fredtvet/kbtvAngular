import { Injectable } from '@angular/core';
import { get, set, Store } from 'idb-keyval';
import { BehaviorSubject, forkJoin, from, Observable, throwError } from 'rxjs';
import { catchError, filter, first, tap } from 'rxjs/operators';
import { Prop } from 'src/app/shared-app/prop.type';
import { ObservableStore } from '../state/abstracts/observable-store';
import { ObservableStoreBase } from '../state/observable-store-base';
import { ClonerService } from '../utility/cloner.service';
import { PersistedInitialStateConfig, PersistedStateConfig } from './persisted-state.config';

const InitializeAction = "initalize_persistedState";

@Injectable({providedIn: 'root'})
export class PersistanceStore extends ObservableStore<Object> {

    private stateInitalizedSubject = new BehaviorSubject<boolean>(false);
    stateInitalized$: Observable<boolean> = this.stateInitalizedSubject.asObservable().pipe(first(x => x === true));

    private dbStore: Store = new Store("kbtvDb", "state");

    constructor(
        base: ObservableStoreBase,
        private clonerService: ClonerService) { 
        super(base);
    }

    init(): void{
        this.initalizeInitialState();
        this.initalizeState();

        this.globalStateChanges$.pipe(
            filter(x => x != null && x.action !== InitializeAction),
            tap(x => this.persistStateChanges(x.stateChanges))
        ).subscribe();
    }

    private persistStateChanges = (stateChanges: Partial<Object>): void => {
        var clone = this.clonerService.deepClone(stateChanges);
        for(const prop in clone){
            this.set(prop, clone[prop]);
        }
    }

    private set<T>(property: Prop<typeof PersistedStateConfig>, payload: T): void{
        this.removePayloadTempProps(payload);
        if(PersistedStateConfig[property]) 
            from(set(property, payload, this.dbStore))
                .subscribe(() => {}, err => console.log(err))
        else if(PersistedInitialStateConfig[property]) 
            window.localStorage.setItem(property as string, JSON.stringify(payload))
    }

    private get$<T>(property: Prop<typeof PersistedStateConfig>): Observable<T>{
        return from(get<T>(property, this.dbStore))
    }

    private initalizeInitialState(): void{
        const state = {};
        for(var prop in PersistedInitialStateConfig){
            const value = window.localStorage.getItem(prop);
            state[prop] = value ? JSON.parse(value) : null;
        }
        this.setState(state, InitializeAction, false);
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
            catchError(error => { return throwError(error) }),
            tap(state => this.setState(this.mapStateArrToStateObj(state, props), InitializeAction, false))
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



