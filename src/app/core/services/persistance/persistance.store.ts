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

    private initialStateInitalizedSubject = new BehaviorSubject<boolean>(false);
    initialStateInitalized$: Observable<boolean> = this.initialStateInitalizedSubject.asObservable().pipe(first(x => x === true));

    private stateInitalizedSubject = new BehaviorSubject<boolean>(false);
    stateInitalized$: Observable<boolean> = this.stateInitalizedSubject.asObservable().pipe(first(x => x === true));

    private dbStore: Store = new Store("kbtvDb", "state");

    constructor() { 
        super({logStateChanges: false, trackStateHistory: false});

        this.initalizeInitialStateFromDb();
        this.initalizeStateFromDb();

        this.globalStateWithPropertyChanges.pipe(
            filter(x => x != null),
            tap(x => this.persistStateChanges(x.stateChanges))
        ).subscribe();
     
    }

    private set<T>(property: keyof typeof PersistedStateConfig, payload: T): void{
        from(set(property, payload, this.dbStore))
            .subscribe(() => {}, err => console.log(err))
    }

    private get$<T>(property: keyof typeof PersistedStateConfig): Observable<T>{
        return from(get<T>(property, this.dbStore))
    }

    private persistStateChanges = (stateChanges: Partial<Object>) => {
        const props = {...PersistedStateConfig, ...PersistedInitialStateConfig};
        for(const prop in stateChanges){
            if(props[prop]) this.set(prop, stateChanges[prop]);
        }
    }

    private initalizeInitialStateFromDb(): void{
        this.initalizePropsFromDb$(Object.keys(PersistedInitialStateConfig))
            .subscribe(x => this.initialStateInitalizedSubject.next(true));
    }

    private initalizeStateFromDb(): void{
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
            tap(state => this.setState(this.mapStateArrToStateObj(state, props), "initalize_persistedState", true, false))
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



