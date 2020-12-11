import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Observable } from 'rxjs';
import { ActionDispatcher } from './action-dispatcher';
import { _applyMetaReducers } from './helpers/apply-meta-reducers.helper';
import { _getReducerStateProps } from './helpers/get-reducer-state-props.helper';
import { _mergeReducers } from './helpers/merge-reducers.helper';
import { tryWithLogging } from './helpers/try-log-error.helper';
import { MetaReducer, Prop, Reducer, ReducerMap, StateChanges, StoreSettings } from './interfaces';
import { selectProp, selectSlice } from './operators/selectors.operator';
import { QueryDispatcher } from './query-dispatcher';
import { StateBase } from './state-base';
import { StateAction } from './state.action';
import { Store } from './store';

export type stateFunc<T> = (state: Partial<T>) => Partial<T>;

export abstract class StoreBase<TState> {

    private reducerMap: ReducerMap = {};

    private _settings: StoreSettings;

    private metaReducers: MetaReducer<any, StateAction>[];

    stateChanges$: Observable<StateChanges<any>> = this.base.stateChanges$;
    
    constructor(
        private base: StateBase,
        private hostStore: Store<any>,
        private queryDispatcher: QueryDispatcher,
        private actionDispatcher: ActionDispatcher,
        reducers: Reducer<any, StateAction>[],
        metaReducers: MetaReducer<any, StateAction>[],
        settings?: StoreSettings,
    ) { 

        this.metaReducers = Object.values(_convertArrayToObject(metaReducers, (reducer) => reducer.constructor.name ));
 
        if(reducers)
            for(const reducer of reducers){
                const name = reducer.action.name;
                const value = this.reducerMap[name];
                this.reducerMap[name] = value ? [...value, reducer] : [reducer];
            }

        this._settings = { logStateChanges: false, ...(settings || {}) };
    }

    dispatch<TAction extends StateAction>(action: TAction): void {
        const stateSnapshot = this.base.getStoreState(null, false);
        this.reduceState(action);
        this.actionDispatcher.dispatch(action, stateSnapshot);
        if(this.hostStore && action.propagate) this.hostStore.dispatch(action);
    }

    select$<TResult = Partial<TState>>(props: Prop<TState>[], deepClone: boolean = true): Observable<TResult>{
        this.dispatchQuery(props)   
        return this.stateChanges$.pipe(selectSlice<TResult>(props, deepClone))
    }

    selectProperty$<TResult>(prop: Prop<TState>, deepClone: boolean = true): Observable<TResult>{
        this.dispatchQuery([prop])
        return this.stateChanges$.pipe(selectProp<TResult>(prop, deepClone))
    }

    select<TResult = Partial<TState>>(props: Prop<TState>[], deepClone: boolean = true): TResult{
        this.dispatchQuery(props)
        return this.base.getStoreState(props, deepClone);
    }

    selectProperty<TResult>(prop: Prop<TState>, deepClone: boolean = true): TResult{
        this.dispatchQuery([prop])
        const state = this.base.getStoreState([prop], deepClone);
        return state ? state[prop] : null;
    }

    private reduceState(action: StateAction): void{
        const actionReducers = this.reducerMap[action.constructor.name];
        if(!actionReducers?.length) return;

        const mergedReducer = _mergeReducers(actionReducers, action);

        const modifiedReducer = _applyMetaReducers(mergedReducer, this.metaReducers);

        const props = _getReducerStateProps(modifiedReducer, action); 

        const state = this.base.getStoreState((props === "all") ? null : props);

        const newState = tryWithLogging(() => modifiedReducer.reducerFn(state, action));
        
        this.setState(newState, null, false) 
    }

    private dispatchQuery = (props: Prop<TState>[]): void => 
        this.queryDispatcher.dispatch({ props });

    private setState(state: Partial<TState>, 
        action?: string, 
        deepCloneState: boolean = true) : void { 
        
        this.base.setStoreState(state, action, deepCloneState);

        if (this._settings.logStateChanges) {
            const caller = (this.constructor) ? '\r\nCaller: ' + this.constructor.name : '';
            console.log('%cSTATE CHANGED', 'font-weight: bold', '\r\nAction: ', action, caller, '\r\nState: ', state);
        }
    }

}
