import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PERSISTANCE_CONFIG } from './injection-tokens.const';
import { PersistanceConfig } from './interfaces';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: "root"})
export class StateReaderService {

    constructor(
        @Inject(PERSISTANCE_CONFIG) private persistanceConfig: PersistanceConfig<any>,
        private stateDbService: StateDbService, 
    ) { }

    getCriticalState(): any{
        const state = {};
        for(const prop in this.persistanceConfig){
            if(!this.persistanceConfig[prop].critical) continue;
            const value = window.localStorage.getItem(prop);
            state[prop] = value ? JSON.parse(value) : null;
        }
        return state;
    }

    getState$(): Observable<any> {       
        const propDbObservables = [];
        const propsInOrder = [];
        for(const prop in this.persistanceConfig){
            if(this.persistanceConfig[prop].critical) continue;
            propsInOrder.push(prop);
            propDbObservables.push(this.stateDbService.get$(prop));
        }
        
        return forkJoin(propDbObservables).pipe(
            catchError(error => { return throwError(error) }),
            map(x => this.mapStateArrToStateObj(x, propsInOrder))
        )
    }

    private mapStateArrToStateObj(stateArr: any[], propsInOrder: ReadonlyArray<string>): Object{
        const stateObj = {};
        for(const index in propsInOrder)
            stateObj[propsInOrder[index]] = stateArr[index];
        return stateObj;
    }
}


