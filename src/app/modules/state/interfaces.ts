import { Immutable, ImmutableArray } from '@immutable/interfaces'
import { Observable } from 'rxjs'
import { StateAction } from './state.action'

export type Prop<T> = Extract<keyof T, string>

export interface DispatchedAction<TAction extends StateAction, TState = {}> { 
    action: Immutable<TAction>, 
    stateSnapshot: Immutable<TState> 
};

export interface Query { props: ImmutableArray<string> };

export interface Effect<TAction extends StateAction> {
    handle$(actions$: Observable<DispatchedAction<TAction>>): Observable<Immutable<StateAction> | void>
    onErrorAction?: (err: any) => Immutable<StateAction>
}

export type ReducerFn<TState, TAction> = (state: Immutable<TState>, action: Immutable<TAction>) => Immutable<Partial<TState>>

export type ReducerMap = {[key: string]: ImmutableArray<Reducer<any, StateAction>>}

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
