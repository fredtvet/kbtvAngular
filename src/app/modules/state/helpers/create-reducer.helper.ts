import { Type } from '@angular/core'
import { ReducerFn, Reducer } from '../interfaces'
import { StateAction } from '../state.action'

export const _createReducer = <TState, TAction extends StateAction>(
    action: Type<TAction>, 
    reducerFn: ReducerFn<TState, TAction>,
    noDeepCloneAction?: boolean): Reducer<TState, TAction> => { 
    return {action, reducerFn, noDeepCloneAction} 
}