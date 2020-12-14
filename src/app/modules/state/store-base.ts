import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { Observable } from 'rxjs';
import { ActionDispatcher } from './action-dispatcher';
import { _applyMetaReducers } from './helpers/apply-meta-reducers.helper';
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

    private metaReducers: Immutable<MetaReducer<any, StateAction>>[];

    stateChanges$: Observable<StateChanges<any>> = this.base.stateChanges$;
    
    constructor(
        private base: StateBase,
        private hostStore: Store<any>,
        private queryDispatcher: QueryDispatcher,
        private actionDispatcher: ActionDispatcher,
        reducers: ImmutableArray<Reducer<any, StateAction>>,
        metaReducers: ImmutableArray<MetaReducer<any, StateAction>>,
        settings?: StoreSettings,
    ) { 
        //Get unique values
        this.metaReducers = metaReducers?.filter((v, i, a) => a.indexOf(v) === i)

        if(reducers)
            for(const reducer of reducers){
                const value = this.reducerMap[reducer.type];
                this.reducerMap[reducer.type] = value ? [...value, reducer] : [reducer];
            }

        this._settings = { logStateChanges: false, ...(settings || {}) };
    }

    dispatch<TAction extends StateAction>(action: TAction): void {
        const stateSnapshot = this.base.getStoreState(null, false);
        this.reduceState(action);
        this.actionDispatcher.dispatch(action, stateSnapshot);
        if(this.hostStore && action.propagate) this.hostStore.dispatch(action);
    }

    select$<TResult = Partial<TState>>(props: ImmutableArray<Prop<TState>>): Observable<Immutable<TResult>>{
        this.dispatchQuery(props)   
        return this.stateChanges$.pipe(selectSlice<Immutable<TResult>>(props))
    }

    selectProperty$<TResult>(prop: Immutable<Prop<TState>>): Observable<Immutable<TResult>>{
        this.dispatchQuery([prop])
        return this.stateChanges$.pipe(selectProp<Immutable<TResult>>(prop))
    }

    select<TResult = Partial<TState>>(props: ImmutableArray<Prop<TState>>): Immutable<TResult>{
        this.dispatchQuery(props)
        return this.base.getStoreState(props, false);
    }

    selectProperty<TResult>(prop: Immutable<Prop<TState>>): Immutable<TResult>{
        this.dispatchQuery([prop])
        const state = this.base.getStoreState([prop], false);
        return state ? state[prop] : null;
    }

    private reduceState(action: StateAction): void{
        const actionReducers = this.reducerMap[action.type];

        if(!actionReducers?.length) return;
        const mergedReducer = _mergeReducers(actionReducers, action.type);

        const modifiedReducer = _applyMetaReducers(mergedReducer, this.metaReducers);

        const state = this.base.getStoreState(null, false);

        const newState = tryWithLogging(() => modifiedReducer.reducerFn(state, action));
        
        this.setState(newState, null, false) 
    }

    private dispatchQuery = (props: ImmutableArray<Prop<TState>>): void => 
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
