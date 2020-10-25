import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { _deepClone } from 'src/app/shared-app/helpers/deep-clone.helper';
import { ObservableStoreSettings } from './interfaces/observable-store-settings.interface';
import { StateChanges } from './interfaces/state-changes.interface';

@Injectable({providedIn: "root"})
export class ObservableStoreBase {  

    private storeState: any = null;

    settingsDefaults: ObservableStoreSettings = {
        logStateChanges: false,
    };    

    private globalStateChangesSubject = new BehaviorSubject<StateChanges<any>>({stateChanges: {}});
    globalStateChanges$ = this.globalStateChangesSubject.asObservable();

    constructor(){ }

    getStoreState(properties: string[]  = null, deepCloneReturnedState: boolean = true) {
        let state = null;

        if (this.storeState && properties && properties.length > 0) {      
            state = {};
            for(var prop of properties)
                state[prop] = this.storeState[prop];                             
        }         
        else state = this.storeState;

        if(state && deepCloneReturnedState) 
            state = _deepClone(state);
        
        return state;
    }

    setStoreState(stateChanges: any, action?: string, deepCloneReturnedState: boolean = true) {
        if(!stateChanges) return;
        
        if(deepCloneReturnedState)
            this.storeState = {...this.storeState, ..._deepClone(stateChanges)}
        else
            this.storeState = {...this.storeState, ...stateChanges};

        this.globalStateChangesSubject.next({stateChanges, action});
    }

}