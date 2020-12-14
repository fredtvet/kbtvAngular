import { StateAction } from '../state.action';
import { Reducer, MetaReducer } from '../interfaces';
import { ImmutableArray } from '@immutable/interfaces';

export function _applyMetaReducers(
    reducer: Reducer<any, StateAction>, 
    metaReducers: ImmutableArray<MetaReducer<any, StateAction>>): Reducer<any, StateAction> {
    if(!metaReducers?.length) return reducer;
    let clone = {...reducer};
    for(const metaReducer of metaReducers) clone = metaReducer(clone)
    return clone;
}