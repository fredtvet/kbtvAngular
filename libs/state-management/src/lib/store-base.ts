import { Immutable, Prop, UnionTupleType } from 'global-types';
import { _tryWithLogging } from 'array-helpers';
import { Observable } from 'rxjs';
import { ActionDispatcher } from './action-dispatcher';
import { _applyInterceptors } from './helpers/apply-interceptors.helper';
import { _deepFreeze } from './helpers/object-freezer.helper';
import { StateAction, StoreSettings } from './interfaces';
import { selectProp } from './operators/select-prop.operator';
import { select } from './operators/select.operator';
import { StateBase } from './state-base';
import { StoreProvidersService } from './store-providers.service';

export abstract class StoreBase<TState> {

    private _settings: StoreSettings;

    /** @readonly The store state */
    get state(): Immutable<TState> { return this.base.getStoreState() }

    /**An observable of the store state */
    state$: Observable<Immutable<TState>>  = this.base.getStoreState$();
    
    constructor(
        protected base: StateBase,
        private actionDispatcher: ActionDispatcher,
        private storeProviders: StoreProvidersService,
        settings?: StoreSettings,
    ) { 
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
        const modifiedAction = _applyInterceptors(action, this.storeProviders.actionInterceptors);
        if(!modifiedAction) return;
        const stateSnapshot = this.base.getStoreState();
        this.reduceState(action);
        this.actionDispatcher.dispatch(action, stateSnapshot);
    }

    /**
     * Responsible for providing the specified slice of state reactivly from state
     * @param props The state properties that should be returned
     * @returns An observable of the specified slice of state
     */
    select$ = <TProps extends Prop<TState>[]>(props: TProps): Observable<Immutable<{[P in UnionTupleType<TProps>]: TState[P]}>> =>
       this.state$.pipe(select(props))

    /**
     * Responsible for providing the specified value reactivly from state
     * @param props The state property that should be returned
     * @returns An observable of the provided property value
     */
    selectProperty$ = <TProp extends Prop<Immutable<TState>>>(prop: TProp): Observable<Immutable<TState>[TProp]> =>
       this.state$.pipe(selectProp<TState, TProp>(prop))
   
    private reduceState(action: Immutable<StateAction>): void{
        const reducer = this.storeProviders.getReducer(action.type);

        if(!reducer) return;
        
        const state = this.base.getStoreState();
        
        const newState = _tryWithLogging(() => reducer.reducerFn(<{}> state, action));
        
        this.base.setStoreState(newState);

        if (this._settings.logStateChanges) 
            console.log('%cSTATE CHANGED', 'font-weight: bold', '\r\nAction: ', action.type, '\r\nChanges: ', newState); 
    }

}