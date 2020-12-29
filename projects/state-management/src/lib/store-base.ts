import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { Observable } from 'rxjs';
import { ActionDispatcher } from './action-dispatcher';
import { _applyMetaReducers } from './helpers/apply-meta-reducers.helper';
import { _mergeReducers } from './helpers/merge-reducers.helper';
import { _deepFreeze } from './helpers/object-freezer.helper';
import { _selectSlice } from './helpers/select-slice.helper';
import { tryWithLogging } from './helpers/try-log-error.helper';
import { MetaReducer, Reducer, ReducerMap, StoreSettings } from './interfaces';
import { selectProp } from './operators/select-prop.operator';
import { select } from './operators/select.operator';
import { StateBase } from './state-base';
import { StateAction } from './state.action';
import { Store } from './store';

export abstract class StoreBase<TState> {

    private reducerMap: ReducerMap = {};

    private _settings: StoreSettings;

    private metaReducers: Immutable<MetaReducer<unknown, StateAction>>[];

    get state(): Immutable<TState> { return this.base.getStoreState() }

    state$: Observable<Immutable<TState>>  = this.base.getStoreState$();
    
    constructor(
        private base: StateBase,
        private hostStore: Store<unknown>,
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
        const stateSnapshot = this.base.getStoreState();
        this.reduceState(action);
        this.actionDispatcher.dispatch(action, stateSnapshot);
        if(this.hostStore && action.propagate) this.hostStore.dispatch(action);
    }

    select$ = <TResult = Partial<TState>>(props: ImmutableArray<Prop<TState>>): Observable<Immutable<TResult>> =>
       this.state$.pipe(select(props))

    selectProperty$ = <TResult>(prop: Prop<Immutable<TState>>): Observable<Immutable<TResult>> =>
       this.state$.pipe(selectProp<TState, TResult>(prop))
   
    private reduceState(action: Immutable<StateAction>): void{
        const actionReducers = this.reducerMap[action.type];
    
        if(!actionReducers?.length) return;
        const mergedReducer = _mergeReducers(actionReducers, action.type);

        const modifiedReducer = _applyMetaReducers(mergedReducer, this.metaReducers);

        const state = this.base.getStoreState();

        const newState = tryWithLogging(() => modifiedReducer.reducerFn(<{}> state, action));
        
        this.setState(<TState> newState) 
    }

    private setState(state: Maybe<Partial<TState>>) : void {        
        this.base.setStoreState(state);
        if (this._settings.logStateChanges) 
            console.log('%cSTATE CHANGED', 'font-weight: bold', '\r\nState: ', state);   
    }

}
