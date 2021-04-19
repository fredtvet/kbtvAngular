import { AppSyncStateConfig } from '../configurations/app-sync-state.config';
import { Immutable, Prop } from 'global-types';
import { _createReducer } from 'state-management';
import { StateSyncTimestamp, SyncStateAction, SyncStateSuccessAction } from 'state-sync';
import { StateIsFetching } from 'model/state-fetcher';
import { ModelState } from './model-state.interface';

export const SetSyncModelsFetchingReducer = _createReducer(
    SyncStateAction, 
    (state: Immutable<StateIsFetching<ModelState> & StateSyncTimestamp>) => 
        state.syncTimestamp ? null : setSyncFetching(state, true)
)

export const SetSyncModelsFetchedReducer = _createReducer(
    SyncStateSuccessAction, 
    (state: Immutable<StateIsFetching<ModelState>>) => 
        state.isFetching?.missions !== true ? null : setSyncFetching(state, false)
)

function setSyncFetching(state: StateIsFetching<ModelState>, val: boolean): StateIsFetching<ModelState>{
    const isFetching = {...state.isFetching};
    for(const prop in AppSyncStateConfig) isFetching[<Prop<ModelState>> prop] = val;     
    return {isFetching};
}
