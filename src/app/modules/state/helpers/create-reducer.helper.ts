import { Reducer, ReducerFn } from '../interfaces'
import { StateAction } from '../state.action'

export const _createReducer = <TState, TAction extends StateAction>(
    type: string, 
    reducerFn: ReducerFn<TState, TAction>): Reducer<TState, TAction> => { 
    return {type, reducerFn} 
}