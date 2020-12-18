import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';
import { Observable } from 'rxjs';
import { ActionDispatcher } from './action-dispatcher';
import { _applyMetaReducers } from './helpers/apply-meta-reducers.helper';
import { _mergeReducers } from './helpers/merge-reducers.helper';
import { _deepFreeze } from './helpers/object-freezer.helper';
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

    private metaReducers: Immutable<MetaReducer<unknown, StateAction>>[];

    stateChanges$: Observable<StateChanges<unknown>> = this.base.stateChanges$;
    
    constructor(
        private base: StateBase,
        private hostStore: Store<unknown>,
        private queryDispatcher: QueryDispatcher,
        private actionDispatcher: ActionDispatcher,
        reducers: ImmutableArray<Reducer<unknown, StateAction>>,
        metaReducers: ImmutableArray<MetaReducer<unknown, StateAction>>,
        settings?: StoreSettings,
    ) { 
        //Get unique values
        this.metaReducers = metaReducers?.filter((v, i, a) => a.indexOf(v) === i)

        if(reducers)
            for(const reducer of reducers){
                const value = this.reducerMap[reducer.type];
                this.reducerMap[reducer.type] = value ? [...value, reducer] : [reducer];
            }  
             
        this._settings = { logStateChanges: false, strictImmutability: true, ...(settings || {}) };

        this.base.strictImmutability = this._settings.strictImmutability;
    }

    dispatch<TAction extends StateAction>(action: Immutable<TAction>): void {
        if(this._settings.strictImmutability) _deepFreeze(action);
        const stateSnapshot = this.base.getStoreState(null, false);
        this.reduceState(action);
        this.actionDispatcher.dispatch(action, stateSnapshot);
        if(this.hostStore && action.propagate) this.hostStore.dispatch(action);
    }

    select$<TResult = Partial<TState>>(
        props: Maybe<ImmutableArray<Prop<TState>>> = null
    ): Observable<Immutable<TResult>>{
        this.dispatchQuery(props || ["all"])   
        return this.stateChanges$.pipe(selectSlice<Immutable<TResult>>(props))
    }

    selectProperty$<TResult>(prop: Prop<Immutable<TState>>): Observable<Maybe<Immutable<TResult>>>{
        this.dispatchQuery([prop])
        return this.stateChanges$.pipe(selectProp<Immutable<TResult>, TState>(prop))
    }

    select<TResult = Partial<TState>>(
        props: Maybe<ImmutableArray<Prop<TState>>> = null
    ): Immutable<TResult> {
        this.dispatchQuery(props || ["all"])
        return this.base.getStoreState(props, false);
    }

    selectProperty<TResult>(prop: Prop<Immutable<TState>>): Maybe<Immutable<TResult>> {
        this.dispatchQuery([prop])
        const state = this.base.getStoreState<TState>([prop], false);
        return state ? <Immutable<TResult>> state[prop] : undefined;
    }

    private reduceState(action: Immutable<StateAction>): void{
        const actionReducers = this.reducerMap[action.type];

        if(!actionReducers?.length) return;
        const mergedReducer = _mergeReducers(actionReducers, action.type);

        const modifiedReducer = _applyMetaReducers(mergedReducer, this.metaReducers);

        const state = this.base.getStoreState(undefined, false);

        const newState = tryWithLogging(() => modifiedReducer.reducerFn(<{}> state, action));
        
        this.setState(<TState> newState, false) 
    }

    private dispatchQuery = (props: ImmutableArray<string>): void => 
        this.queryDispatcher.dispatch({ props, stateSnapshot: this.base.getStoreState(props, false) });

    private setState(state: Maybe<Partial<TState>>, 
        deepCloneState: boolean = true) : void { 

        this.base.setStoreState(state, deepCloneState);

        if (this._settings.logStateChanges) {
            const caller = (this.constructor) ? '\r\nCaller: ' + this.constructor.name : '';
            console.log('%cSTATE CHANGED', 'font-weight: bold', caller, '\r\nState: ', state);
        }
    }

}
