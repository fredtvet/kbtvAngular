import { Immutable, Maybe } from 'global-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { _deepFreeze } from './helpers/object-freezer.helper';

export class StateBase {  
    
    strictImmutability: Maybe<boolean>;

    private storeStateSubject: BehaviorSubject<{}>;
    private storeState$: Observable<Immutable<{}>>;

    constructor(defaultState?: Object){ 
        this.storeStateSubject = new BehaviorSubject<{}>({...(defaultState || {})});
        this.storeState$ = this.storeStateSubject.asObservable();
    }

    getStoreState = <T extends {}>(): Immutable<T> => 
        <Immutable<T>> this.storeStateSubject.value;

    getStoreState$ = <T extends {}>(): Observable<Immutable<T>> => 
        <Observable<Immutable<T>>> this.storeState$;

    setStoreState(stateChanges: Maybe<{}>): void {
        if(!stateChanges) return;

        const newState = {...this.storeStateSubject.value, ...stateChanges};

        if(this.strictImmutability) _deepFreeze(newState);

        this.storeStateSubject.next(newState);
    }

}