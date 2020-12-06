import { Inject, Injectable, Optional } from '@angular/core';
import { skip, tap } from 'rxjs/operators';
import { _convertArrayToObject } from 'src/app/shared-app/helpers/array/convert-array-to-object.helper';
import { _deepClone } from 'src/app/shared-app/helpers/deep-clone.helper';
import { Store } from 'src/app/state/store';
import { PERSISTED_STATE_PROPS, PERSISTED_CRITICAL_STATE_PROPS } from './injection-tokens.const';
import { StateDbService } from './state-db.service';

@Injectable({providedIn: 'root'})
export class StatePersisterService {
    
    private stateMap: {[key: string]: any};
    private criticalStateMap: {[key: string]: any};

    constructor(
        private store: Store<any>,  
        private stateDbService: StateDbService, 
        @Inject(PERSISTED_STATE_PROPS) @Optional() stateProps: ReadonlyArray<string>,
        @Inject(PERSISTED_CRITICAL_STATE_PROPS) @Optional() criticalStateProps: ReadonlyArray<string>,
    ) { 
        this.stateMap = _convertArrayToObject(stateProps)
        this.criticalStateMap = _convertArrayToObject(criticalStateProps)
    }

    initalize(): void{
        this.store.stateChanges$.pipe(
            skip(1), 
            tap(x => this.persistStateChanges(x.stateChanges))
        ).subscribe();
    }

    private persistStateChanges = (stateChanges: Partial<Object>): void => {
        var clone = _deepClone(stateChanges);
        for(const prop in clone){
            const payload = clone[prop];
            this.removePayloadTempProps(payload);
            if(this.stateMap[prop]) 
                this.stateDbService.set(prop, payload)
            else if(this.criticalStateMap[prop]) 
                window.localStorage.setItem(prop as string, JSON.stringify(payload))
        }
    }

    private removePayloadTempProps<T>(payload: T): void{
        if(Array.isArray(payload) && payload.length > 0 && typeof payload[0] === "object") 
            for(var item of payload) this.removeObjectTempProps(item)
        else if(typeof payload === "object") this.removeObjectTempProps(payload);
    }

    private removeObjectTempProps<T extends Object>(obj: T): void{
        for(var key in obj)
            if(key.indexOf("temp_") !== -1) delete obj[key]    
    }
}



