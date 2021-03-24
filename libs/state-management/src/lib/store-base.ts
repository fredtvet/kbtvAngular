import { _groupBy } from 'array-helpers';
import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { Observable } from 'rxjs';
import { ActionDispatcher } from './action-dispatcher';
import { _applyInterceptors } from './helpers/apply-interceptors.helper';
import { _applyMetaReducers } from './helpers/apply-meta-reducers.helper';
import { _mergeReducers } from './helpers/merge-reducers.helper';
import { _deepFreeze } from './helpers/object-freezer.helper';
import { _selectSlice } from './helpers/select-slice.helper';
import { tryWithLogging } from './helpers/try-log-error.helper';
import { ActionInterceptor, MetaReducer, Reducer, StoreSettings } from './interfaces';
import { selectProp } from './operators/select-prop.operator';
import { select } from './operators/select.operator';
import { StateBase } from './state-base';
import { StateAction } from './state.action';
import { Store } from './store';

type ReducerMap = {[key: string]: Immutable<Reducer<unknown, StateAction>>}

export abstract class StoreBase<TState> {

    private reducerMap: ReducerMap = {};

    private _settings: StoreSettings;

    /** @readonly The store state */
    get state(): Immutable<TState> { return this.base.getStoreState() }

    /**An observable of the store state */
    state$: Observable<Immutable<TState>>  = this.base.getStoreState$();
    
    constructor(
        private base: StateBase,
        private hostStore: Store<unknown>,
        private actionDispatcher: ActionDispatcher,
        reducers: ImmutableArray<Reducer<unknown, StateAction>>,
        metaReducers: ImmutableArray<MetaReducer<unknown, StateAction>>,
        private interceptors: ImmutableArray<ActionInterceptor>,
        settings?: StoreSettings,
    ) { 
        const uniqueMetaReducers = metaReducers?.filter((v, i, a) => a.indexOf(v) === i)
        
        if(reducers){
            const groupedReducers = _groupBy(reducers, "type")
            for(const type in groupedReducers){
               const mergedReducer = _mergeReducers(groupedReducers[type], type);
               this.reducerMap[type] = _applyMetaReducers(mergedReducer, uniqueMetaReducers);
            }
        }

        this._settings = { logStateChanges: false, strictImmutability: true, ...(settings || {}) };

        this.base.strictImmutability = this._settings.strictImmutability;
    }

    /**
     * Responsible for dispatching the action to the relevant parts of the state layer. 
     * @remarks Applies interceptors and reducers before dispatching to {@link ActionDispatcher}.  
     * @param action 
     */
    dispatch<TAction extends StateAction>(action: Immutable<TAction>): void {
        if(this._settings.strictImmutability) _deepFreeze(action);
        const modifiedAction = _applyInterceptors(action, this.interceptors);
        if(!modifiedAction) return;
        const stateSnapshot = this.base.getStoreState();
        this.reduceState(action);
        this.actionDispatcher.dispatch(action, stateSnapshot);
        if(this.hostStore && action.propagate) this.hostStore.dispatch(action);
    }

    /**
     * Responsible for providing the specified slice of state reactivly from state
     * @param props The state properties that should be returned
     * @returns An observable of the specified slice of state
     */
    select$ = <TResult = Partial<TState>>(props: ImmutableArray<Prop<TState>>): Observable<Immutable<TResult>> =>
       this.state$.pipe(select(props))

    /**
     * Responsible for providing the specified value reactivly from state
     * @param props The state property that should be returned
     * @returns An observable of the provided property value
     */
    selectProperty$ = <TResult>(prop: Prop<Immutable<TState>>): Observable<Immutable<TResult>> =>
       this.state$.pipe(selectProp<TState, TResult>(prop))
   
    private reduceState(action: Immutable<StateAction>): void{
        const reducer = this.reducerMap[action.type];

        if(!reducer) return;

        const state = this.base.getStoreState();

        const newState = tryWithLogging(() => reducer.reducerFn(<{}> state, action));
        
        this.setState(<TState> newState) 
    }

    private setState(state: Maybe<Partial<TState>>) : void {        
        this.base.setStoreState(state);
        if (this._settings.logStateChanges) 
            console.log('%cSTATE CHANGED', 'font-weight: bold', '\r\nState: ', state);   
    }

}
