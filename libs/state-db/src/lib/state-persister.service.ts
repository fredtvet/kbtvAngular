import { Inject, Injectable } from '@angular/core';
import { UnknownState } from 'global-types';
import { Store } from 'state-management'
import { filter, pairwise, tap } from 'rxjs/operators';
import { STATE_DB_CONFIG } from './injection-tokens.const';
import { StateDbConfig, StorageType } from './interfaces';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: 'root'})
export class StatePersisterService {

    private initalizedStorages: Record<string, boolean>;
    
    constructor(
        private store: Store<UnknownState>,  
        private stateDbService: StateDbService, 
        @Inject(STATE_DB_CONFIG) private dbConfig: StateDbConfig<UnknownState>,
    ) { 
        this.store.state$.pipe(
            filter(x => this.initalizedStorages !== undefined),
            pairwise(),
            tap(this.persistChanges)
        ).subscribe();
    }

    initalize(storageType: StorageType): void{
        if(this.initalizedStorages === undefined) this.initalizedStorages = {[storageType]: true};
        else this.initalizedStorages[storageType] = true;
    }

    private persistChanges = ([oldState, newState]: [UnknownState, UnknownState]): void => { 
        for(const prop in this.dbConfig)
            if(oldState[prop] !== newState[prop]) this.persistPropChanges(prop, newState[prop])  
    }

    private persistPropChanges = (prop: string, payload: unknown): void => {     
        const propCfg = this.dbConfig[prop];

        if(this.initalizedStorages[propCfg.storageType] !== true) return;

        if(propCfg.onPersistMapping) payload = propCfg.onPersistMapping(payload);
         
        if(propCfg.storageType === "idb-keyval") 
            this.stateDbService.set(prop, payload)
        else
             window.localStorage.setItem(prop, JSON.stringify(payload))
    }

}



