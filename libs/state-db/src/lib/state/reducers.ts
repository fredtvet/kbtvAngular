import { Reducer, _createReducer } from 'state-management';
import { SetPersistedCriticalStateAction, SetPersistedStateAction } from './actions.const';

export const SetPersistedCriticalStateReducer: Reducer<unknown, SetPersistedCriticalStateAction> = _createReducer(
    SetPersistedCriticalStateAction, (state, action) => action.state,
)

export const SetPersistedStateReducer: Reducer<unknown, SetPersistedStateAction> = _createReducer(
    SetPersistedStateAction, (state, action) => action.state,
)
