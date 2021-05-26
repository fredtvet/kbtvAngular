import { Inject, Injectable } from '@angular/core';
import { UnknownState } from 'global-types';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { STATE_DB_CONFIG } from './injection-tokens.const';
import { StateDbConfig, StorageType } from './interfaces';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: "root"})
export class StateReaderService {

    constructor(
        @Inject(STATE_DB_CONFIG) private dbConfig: StateDbConfig<UnknownState>,
        private stateDbService: StateDbService, 
    ) { }

    get$<TState extends object>(type: StorageType): Observable<TState> {
        if(type === "localStorage") return of(this.getLocalStorageState());
        else return this.getIDbKeyValState$();
    }

    private getLocalStorageState<T extends object>(): T {
        const state: UnknownState = {};
        for(const prop in this.dbConfig){
            if(this.dbConfig[prop].storageType !== "localStorage") continue;
            const value = window.localStorage.getItem(prop)
            state[prop] = (value !== 'undefined' && value != null) ? JSON.parse(value) : null;
        }
        return <T> state;
    }

    private getIDbKeyValState$<T extends object>(): Observable<T> {       
        const propDbObservables = [];
        const propsInOrder: string[] = [];
        for(const prop in this.dbConfig){
            if(this.dbConfig[prop].storageType !== "idb-keyval") continue;
            propsInOrder.push(prop);
            propDbObservables.push(this.stateDbService.get$(prop));
        }
        
        return forkJoin(propDbObservables).pipe(
            catchError(error => { return throwError(error) }),
            map(x => <T> this.mapStateArrToStateObj(x, propsInOrder))
        )
    }

    private mapStateArrToStateObj(stateArr: unknown[], propsInOrder: ReadonlyArray<string>): UnknownState{
        const stateObj: UnknownState = {};
        for(const index in propsInOrder)
            stateObj[propsInOrder[index]] = stateArr[index];
        return stateObj;
    }
}


