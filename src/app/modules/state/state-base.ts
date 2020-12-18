import { Immutable, ImmutableArray, Maybe, UnknownState } from '@global/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { _deepClone } from './helpers/deep-clone.helper';
import { _deepFreeze } from './helpers/object-freezer.helper';
import { StateChanges } from './interfaces';

export class StateBase {  
    
    strictImmutability: Maybe<boolean>;

    private storeState: UnknownState; 

    private stateChangesSubject: BehaviorSubject<StateChanges<unknown>>;
    stateChanges$: Observable<StateChanges<unknown>>;

    constructor(defaultState?: Object){ 
        this.storeState = {...defaultState};
        this.stateChangesSubject = new BehaviorSubject<StateChanges<unknown>>({stateChanges: {}, state: this.storeState});
        this.stateChanges$ = this.stateChangesSubject.asObservable();
    }

    getStoreState<T extends {}>(properties: Maybe<ImmutableArray<string>>, deepClone: boolean = true): Immutable<T> {
        let state: Maybe<UnknownState> = {};

        if (this.storeState && properties) {      
            state = {};
            for(var prop of properties)
                state[prop] = this.storeState[prop];                             
        }         
        else state = this.storeState;

        if(state){
            if(deepClone) state = <UnknownState> _deepClone(state);
            else state = {...state}
        }

        return <Immutable<T>> state;
    }

    setStoreState(stateChanges: Maybe<{}>, deepClone: boolean = true, dispatchChanges: boolean = true): void {
        if(!stateChanges) return;

        if(deepClone)
            this.storeState = {...this.storeState, ...<UnknownState>_deepClone(stateChanges)}
        else
            this.storeState = {...this.storeState, ...stateChanges};

        if(this.strictImmutability) _deepFreeze(this.storeState);

        if(dispatchChanges)
            this.stateChangesSubject.next({stateChanges, state: this.storeState});
    }

}