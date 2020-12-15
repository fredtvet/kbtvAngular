import { ImmutableArray } from '@immutable/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { _deepClone } from './helpers/deep-clone.helper';
import { _deepFreeze } from './helpers/object-freezer.helper';
import { StateChanges } from './interfaces';

export class StateBase {  
    
    strictImmutability:boolean;

    private storeState: Object; 

    private stateChangesSubject: BehaviorSubject<StateChanges<unknown>>;
    stateChanges$: Observable<StateChanges<unknown>>;

    constructor(defaultState?: Object){ 
        this.storeState = {...defaultState};
        this.stateChangesSubject = new BehaviorSubject<StateChanges<unknown>>({stateChanges: {}, state: this.storeState});
        this.stateChanges$ = this.stateChangesSubject.asObservable();
    }

    getStoreState(properties: ImmutableArray<string>  = null, deepClone: boolean = true) {
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

    setStoreState(stateChanges: Object, action?: string, deepClone: boolean = true, dispatchChanges: boolean = true) {
        if(!stateChanges) return;

        if(deepClone)
            this.storeState = {...this.storeState, ..._deepClone(stateChanges)}
        else
            this.storeState = {...this.storeState, ...stateChanges};

        if(this.strictImmutability) _deepFreeze(this.storeState);

        if(dispatchChanges)
            this.stateChangesSubject.next({stateChanges, action, state: this.storeState});
    }

}