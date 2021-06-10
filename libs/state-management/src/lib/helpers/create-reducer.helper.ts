import { Reducer, ReducerFn, StateAction } from '../interfaces'

/** Helper function that creates a reducer
 *  @param type - The action type that triggers the reducer
 *  @param reducerFn - The reducerFn that should be executed
 *  @returns A reducer with the specified parameters. */
export const _createReducer = <TState, TAction extends StateAction>(
    type: TAction['type'], 
    reducerFn: ReducerFn<TState, TAction>): Reducer<TState, TAction> => { 
    return {type, reducerFn} 
}