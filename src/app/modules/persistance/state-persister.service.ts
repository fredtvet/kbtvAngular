import { Inject, Injectable } from '@angular/core';
import { Immutable, UnknownState } from '@global/interfaces';
import { Store } from '@state/store';
import { skip, tap } from 'rxjs/operators';
import { PERSISTANCE_CONFIG } from './injection-tokens.const';
import { PersistanceConfig } from './interfaces';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: 'root'})
export class StatePersisterService {
    
    constructor(
        private store: Store<unknown>,  
        private stateDbService: StateDbService, 
        @Inject(PERSISTANCE_CONFIG) private persistanceConfig: PersistanceConfig<UnknownState>,
    ) { }

    initalize(): void{
        this.store.stateChanges$.pipe(
            skip(1), 
            tap(x => this.persistStateChanges(x.stateChanges))
        ).subscribe();
    }

    private persistStateChanges = (stateChanges: Immutable<UnknownState>): void => {
        for(const prop in stateChanges){
            const propCfg = this.persistanceConfig[prop];
            if(!propCfg) continue;

            let payload = stateChanges[prop];
      
            if(propCfg.onPersistMapping) payload = propCfg.onPersistMapping(payload);
         
            if(!propCfg.critical) 
                this.stateDbService.set(prop, payload)
            else
                window.localStorage.setItem(prop, JSON.stringify(payload))
        }
    }

}



