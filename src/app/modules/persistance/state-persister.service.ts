import { Inject, Injectable } from '@angular/core';
import { Immutable } from '@immutable/interfaces';
import { _deepClone } from '@state/helpers/deep-clone.helper';
import { Store } from '@state/store';
import { skip, tap } from 'rxjs/operators';
import { PERSISTANCE_CONFIG } from './injection-tokens.const';
import { PersistanceConfig } from './interfaces';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: 'root'})
export class StatePersisterService {
    
    constructor(
        private store: Store<any>,  
        private stateDbService: StateDbService, 
        @Inject(PERSISTANCE_CONFIG) private persistanceConfig: PersistanceConfig<any>,
    ) { }

    initalize(): void{
        this.store.stateChanges$.pipe(
            skip(1), 
            tap(x => this.persistStateChanges(x.stateChanges))
        ).subscribe();
    }

    private persistStateChanges = (stateChanges: Immutable<Object>): void => {
        for(const prop in stateChanges){
            const propCfg = this.persistanceConfig[prop];
            if(!propCfg) continue;

            let payload = stateChanges[prop];

            if(propCfg.enableTempData)
                payload = this.removePayloadTempProps(payload);

            if(!propCfg.critical) 
                this.stateDbService.set(prop, payload)
            else
                window.localStorage.setItem(prop, JSON.stringify(payload))
        }
    }

    private removePayloadTempProps(payload: Immutable<any>): Immutable<any>{
        if(Array.isArray(payload) && payload.length > 0 && typeof payload[0] === "object") {
            const clone = [...payload];
            for(var key in clone) clone[key] = this.removeObjectTempProps(clone[key])
            return clone;
        }
        else if(typeof payload === "object") 
            return this.removeObjectTempProps(payload);
    }

    private removeObjectTempProps(obj: Immutable<Object>): Immutable<Object>{
        var clone = {...obj};
        for(var key in obj)
            if(key.indexOf("temp_") !== -1) delete clone[key] 
        return clone; 
    }
}



