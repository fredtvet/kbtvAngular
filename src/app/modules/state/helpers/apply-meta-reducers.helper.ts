import { StateAction } from '../state.action';
import { Reducer, MetaReducer } from '../interfaces';
import { _getReducerStateProps } from './get-reducer-state-props.helper';

export function _applyMetaReducers(
    reducer: Reducer<any, StateAction>, 
    metaReducers: ReadonlyArray<MetaReducer<any, StateAction>>): Reducer<any, StateAction> {
    if(!metaReducers?.length) return reducer;
    let clone = {...reducer};
    for(const metaReducer of metaReducers) clone = metaReducer(clone)
    return clone;

}