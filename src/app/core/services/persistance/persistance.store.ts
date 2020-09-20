import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { get, set, Store } from 'idb-keyval';
import { forkJoin, from, Observable, BehaviorSubject, throwError } from 'rxjs';
import { PersistedStateConfig, PersistedInitialStateConfig } from './persisted-state.config';
import { tap, filter, first, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersistanceStore extends ObservableStore<Object> {

    private stateInitalizedSubject = new BehaviorSubject<boolean>(false);
    stateInitalized$: Observable<boolean> = this.stateInitalizedSubject.asObservable().pipe(first(x => x === true));

    private dbStore: Store = new Store("kbtvDb", "state");

    constructor() { 
        super({logStateChanges: false, trackStateHistory: true});
    }

    init(): void{
        this.initalizeInitialState();
        this.initalizeState();

        this.globalStateWithPropertyChanges.pipe(
            filter(x => x != null),
            tap(x => this.persistStateChanges(x.stateChanges))
        ).subscribe();
    }

    private set<T>(property: keyof typeof PersistedStateConfig, payload: T): void{
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
        this.setState(state, "initalize_persistedState", false, false);
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
            tap(state => this.setState(this.mapStateArrToStateObj(state, props), "initalize_persistedState", false, false))
        )
    }

    private mapStateArrToStateObj(stateArr: any[], propsInOrder: string[]): Object{
        let stateObj = {};
        for(const index in propsInOrder){
            stateObj[propsInOrder[index]] = stateArr[index];
        }
        return stateObj;
    }
}



