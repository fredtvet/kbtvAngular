import { Inject, Injectable } from '@angular/core';
import { UnknownState } from 'global-types';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { STATE_DB_CONFIG } from './injection-tokens.const';
import { StateDbConfig } from './interfaces';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: "root"})
export class StateReaderService {

    constructor(
        @Inject(STATE_DB_CONFIG) private dbConfig: StateDbConfig<UnknownState>,
        private stateDbService: StateDbService, 
    ) { }

    getCriticalState(): UnknownState {
        const state: UnknownState = {};
        for(const prop in this.dbConfig){
            if(!this.dbConfig[prop].critical) continue;
            const value = window.localStorage.getItem(prop)
            state[prop] = (value !== 'undefined' && value != null) ? JSON.parse(value) : null;
        }
        return state;
    }

    getState$(): Observable<UnknownState> {       
        const propDbObservables = [];
        const propsInOrder: string[] = [];
        for(const prop in this.dbConfig){
            if(this.dbConfig[prop].critical) continue;
            propsInOrder.push(prop);
            propDbObservables.push(this.stateDbService.get$(prop));
        }
        
        return forkJoin(propDbObservables).pipe(
            catchError(error => { return throwError(error) }),
            map(x => this.mapStateArrToStateObj(x, propsInOrder))
        )
    }

    private mapStateArrToStateObj(stateArr: unknown[], propsInOrder: ReadonlyArray<string>): UnknownState{
        const stateObj: UnknownState = {};
        for(const index in propsInOrder)
            stateObj[propsInOrder[index]] = stateArr[index];
        return stateObj;
    }
}


