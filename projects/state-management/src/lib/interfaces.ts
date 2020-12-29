import { Immutable, ImmutableArray, Maybe, Prop, UnknownState } from 'global-types'
import { Observable } from 'rxjs'
import { StateAction } from './state.action'

export type StateSelector<TState, TResult> = ((s: Immutable<TState>) => Immutable<TResult>) | (Prop<TState>[])

export interface DispatchedAction<TAction extends StateAction, TState = {}> { 
    action: Immutable<TAction>, 
    stateSnapshot: Immutable<TState>
};

export interface Query { props: Maybe<ImmutableArray<string>>, stateSnapshot: Immutable<UnknownState> };

export interface Effect<TAction extends StateAction> {
    handle$(actions$: Observable<DispatchedAction<TAction>>): Observable<Immutable<StateAction> | void>
    onErrorAction?: (err: unknown) => Immutable<StateAction>
}

export type ReducerFn<TState, TAction> = (state: Immutable<TState>, action: Immutable<TAction>) => Maybe<Immutable<Partial<TState>>>

export type ReducerMap = {[key: string]: ImmutableArray<Reducer<unknown, StateAction>>}

export interface Reducer<TState, TAction extends StateAction> {
    type: string;
    reducerFn: ReducerFn<TState, TAction>;
}

export type MetaReducer<TState, TAction extends StateAction> = 
    (reducer: Immutable<Reducer<TState, TAction>>) => Reducer<TState, TAction>

export interface StateChanges<T> {
    action?: string, //unuseD?
    stateChanges: Immutable<Partial<T>>;
    state: Immutable<T>;
}

export interface StoreSettings { logStateChanges?: boolean, strictImmutability?: boolean; }
