import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { _deepClone } from '@shared-app/helpers/deep-clone.helper';
import { StateChanges } from './interfaces/state-changes.interface';

export class StateBase {  

    private storeState: Object; 

    private stateChangesSubject: BehaviorSubject<StateChanges<any>>;
    stateChanges$: Observable<StateChanges<any>>;

    constructor(defaultState?: Object){ 
        this.storeState = {...defaultState};
        this.stateChangesSubject = new BehaviorSubject<StateChanges<any>>({stateChanges: {}, state: this.storeState});
        this.stateChanges$ = this.stateChangesSubject.asObservable();
    }

    getStoreState(properties: string[]  = null, deepClone: boolean = true) {
        let state = null;

        if (this.storeState && properties) {      
            state = {};
            for(var prop of properties)
                state[prop] = this.storeState[prop];                             
        }         
        else state = this.storeState;

        if(state){
            if(deepClone) state = _deepClone(state);
            else state = {...state}
        }

        return state;
    }

    setStoreState(stateChanges: any, action?: string, deepClone: boolean = true, dispatchChanges: boolean = true) {
        if(!stateChanges) return;
       
        if(deepClone)
            this.storeState = {...this.storeState, ..._deepClone(stateChanges)}
        else
            this.storeState = {...this.storeState, ...stateChanges};

        if(dispatchChanges)
            this.stateChangesSubject.next({stateChanges, action, state: this.storeState});
    }

}