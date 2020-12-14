import { Type } from '@angular/core'
import { Immutable, ImmutableArray } from '@immutable/interfaces'
import { Observable } from 'rxjs'
import { StateAction } from './state.action'

export type Prop<T> = Extract<keyof T, string>

export interface DispatchedAction<TAction extends StateAction, TState = {}> { action: TAction, stateSnapshot: Immutable<TState> };

export interface Query { props: ImmutableArray<string> };

export interface Effect<TAction extends StateAction> {
    handle$(actions$: Observable<DispatchedAction<TAction>>): Observable<StateAction | void>
    onErrorAction?: (err: any) => StateAction
}

export type ReducerFn<TState, TAction> = (state: Immutable<TState>, action: Immutable<TAction>) => Partial<TState>

export type ReducerMap = {[key: string]: Reducer<any, StateAction>[]}

export interface Reducer<TState, TAction extends StateAction> {
    action: Type<TAction>;
    reducerFn: ReducerFn<TState, TAction>;
    // stateProperties?: ((action: Readonly<TAction>) => Prop<TState>[]) | Prop<TState>[] | 'all';
    // noDeepCloneState?: boolean;
    noDeepCloneAction?: boolean
}

export type MetaReducer<TState, TAction extends StateAction> = 
    (reducer: Immutable<Reducer<TState, TAction>>) => Reducer<TState, TAction>

export interface StateChanges<T> {
    action?: string,
    stateChanges: Immutable<Partial<T>>;
    state: Immutable<T>;
}

export interface StoreSettings { logStateChanges?: boolean; }
