import { merge, Observable, of } from 'rxjs';
import { filter, map, skip } from 'rxjs/operators';
import { Prop } from '../model/state.types';
import { ObservableStoreSettings, StateChanges } from './interfaces';
import { ObservableStoreBase } from './observable-store-base';


/**
 * Executes a function on `state` and returns a version of T
 * @param state - the original state model
 */
export type stateFunc<T> = (state: T) => Partial<T>;

export abstract class ObservableStore<TState> {

    private _settings: ObservableStoreSettings;

    globalStateChanges$: Observable<StateChanges<TState>> = this.base.globalStateChanges$;
    
    constructor(
        private base: ObservableStoreBase,
        settings: ObservableStoreSettings
    ) {
        this._settings = { ...base.settingsDefaults, ...settings };        
    }

    protected stateProperty$<TProp>(prop: Prop<TState>, deepCloneReturnedState: boolean = true): Observable<TProp>{
        if(!prop) return of(null);
        return merge(
            of(null).pipe(map(x => this.getStateProperty<TProp>(prop, deepCloneReturnedState))),
            this.statePropertyChanges$<TProp>(prop, deepCloneReturnedState)
        )
    }

    protected statePropertyChanges$<TProp>(prop: Prop<TState>, deepCloneReturnedState: boolean = true): Observable<TProp>{
        if(!prop) return of(null);
        return this.base.globalStateChanges$.pipe(skip(1),
            filter(({stateChanges}) => 
                (stateChanges && stateChanges.hasOwnProperty(prop)) ? true : false
            ),
            map(x => this.getStateProperty(prop, deepCloneReturnedState)),
        )
    }

    protected stateSlice$(properties: Prop<TState>[], deepCloneReturnedState: boolean = true): Observable<Partial<TState>>{
        if(!properties || properties.length === 0) return of(null);
        return merge(
            of(null).pipe(map(x => this.getStateProperties(properties, deepCloneReturnedState))),
            this.stateSliceChanges$(properties, deepCloneReturnedState)
        )
    }

    protected stateSliceChanges$(properties: Prop<TState>[], deepCloneReturnedState: boolean = true): Observable<Partial<TState>>{
        if(!properties || properties.length === 0) return of(null);
        return this.globalStateChanges$.pipe(skip(1),
            filter(({stateChanges}) => {
                for(const prop of properties)
                    if(stateChanges.hasOwnProperty(prop)) return true; 
                return false;
            }),
            map(x => this.getStateProperties(properties, deepCloneReturnedState))
        )
    }

    protected getStateProperties(properties: Prop<TState>[] = null, deepCloneReturnedState: boolean = true) : Partial<TState> {
        return this.base.getStoreState(properties, deepCloneReturnedState);
    }

    protected getStateProperty<TProp>(propertyName: Prop<TState>, deepCloneReturnedState: boolean = true) : TProp {
        const state = this.base.getStoreState([propertyName], deepCloneReturnedState);
        return state ? state[propertyName] : null;
    }

    protected setState(state: Partial<TState>, 
        action?: string, 
        deepCloneState: boolean = true) : void { 
        
        this.base.setStoreState(state, action, deepCloneState);

        if (this._settings.logStateChanges) {
            const caller = (this.constructor) ? '\r\nCaller: ' + this.constructor.name : '';
            console.log('%cSTATE CHANGED', 'font-weight: bold', '\r\nAction: ', action, caller, '\r\nState: ', state);
        }
    }

    protected setStateWithStateFunc(properties: Prop<TState>[], 
        stateFunc: stateFunc<Partial<TState>>,
        action?: string, 
        deepCloneState: boolean = true): void {
        this.setState(
            stateFunc(this.getStateProperties(properties, true)), 
            action, 
            deepCloneState
        )
    }
 
}
