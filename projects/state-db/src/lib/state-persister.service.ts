import { Inject, Injectable } from '@angular/core';
import { UnknownState } from 'global-types';
import { Store } from 'state-management'
import { pairwise, tap } from 'rxjs/operators';
import { STATE_DB_CONFIG } from './injection-tokens.const';
import { StateDbConfig } from './interfaces';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: 'root'})
export class StatePersisterService {
    
    constructor(
        private store: Store<UnknownState>,  
        private stateDbService: StateDbService, 
        @Inject(STATE_DB_CONFIG) private dbConfig: StateDbConfig<UnknownState>,
    ) { }

    initalize(): void{
        this.store.state$.pipe(
            pairwise(),
            tap(this.persistChanges)
        ).subscribe();
    }

    private persistChanges = ([oldState, newState]: [UnknownState, UnknownState]): void => { 
        for(const prop in this.dbConfig)
            if(oldState[prop] !== newState[prop]) this.persistPropChanges(prop, newState[prop])  
    }

    private persistPropChanges = (prop: string, payload: unknown): void => { 
        const propCfg = this.dbConfig[prop];
      
        if(propCfg.onPersistMapping) payload = propCfg.onPersistMapping(payload);
         
        if(!propCfg.critical) 
            this.stateDbService.set(prop, payload)
        else
             window.localStorage.setItem(prop, JSON.stringify(payload))
    }

}



