import { Type } from '@angular/core'
import { Observable } from 'rxjs'
import { StateAction } from './state.action'

export type Prop<T> = Extract<keyof T, string>

export interface DispatchedAction<TAction extends StateAction> { action: TAction, stateSnapshot: Readonly<any> };

export interface Query { props: string[] };

export interface Effect<TAction extends StateAction> {
    handle$(actions$: Observable<DispatchedAction<TAction>>): Observable<StateAction | void>
    onErrorAction?: (err: any) => StateAction
}

export type ReducerFn<TState, TAction> = (state: Partial<TState>, action: TAction) => Partial<TState>

export type ReducerMap = {[key: string]: Reducer<any, StateAction>[]}

export interface Reducer<TState, TAction extends StateAction> {
    action: Type<TAction>;
    reducerFn: ReducerFn<TState, TAction>;
    stateProperties?: ((action: Readonly<TAction>) => Prop<TState>[]) | Prop<TState>[] | 'all';
    noDeepCloneState?: boolean;
    noDeepCloneAction?: boolean
}

export type MetaReducer<TState, TAction extends StateAction> = 
    (reducer: Readonly<Reducer<TState, TAction>>) => Reducer<TState, TAction>

export interface StateChanges<T> {
    action?: string,
    stateChanges: Partial<T>;
    state: T;
}

export interface StoreSettings { logStateChanges?: boolean; }
