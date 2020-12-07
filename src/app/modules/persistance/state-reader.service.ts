import { Inject, Injectable, Optional } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PERSISTED_CRITICAL_STATE_PROPS, PERSISTED_STATE_PROPS } from './injection-tokens.const';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: "root"})
export class StateReaderService {

    constructor(
        @Inject(PERSISTED_STATE_PROPS) @Optional() private stateProps: ReadonlyArray<string>,
        @Inject(PERSISTED_CRITICAL_STATE_PROPS) @Optional() private criticalStateProps: ReadonlyArray<string>,
        private stateDbService: StateDbService, 
    ) { }

    getCriticalState(): any{
        const state = {};
        if(!this.criticalStateProps) return state;
        for(var prop of this.criticalStateProps){
            const value = window.localStorage.getItem(prop);
            state[prop] = value ? JSON.parse(value) : null;
        }
        return state;
    }

    getState$(): Observable<any> {
        if(!this.stateProps) return of({});
        
        const propDbObservables = [];
        
        for(const prop of this.stateProps)
            propDbObservables.push(this.stateDbService.get$(prop));
        
        return forkJoin(propDbObservables).pipe(
            catchError(error => { return throwError(error) }),
            map(x => this.mapStateArrToStateObj(x, this.stateProps))
        )
    }

    private mapStateArrToStateObj(stateArr: any[], propsInOrder: ReadonlyArray<string>): Object{
        const stateObj = {};
        for(const index in propsInOrder){
            stateObj[propsInOrder[index]] = stateArr[index];
        }
        return stateObj;
    }
}


