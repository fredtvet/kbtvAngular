import { Immutable } from 'global-types';
import { Reducer, _createReducer } from 'state-management'
import { SetPersistedCriticalStateAction, SetPersistedStateAction } from './actions.const';

export const SetPersistedCriticalStateReducer: Reducer<unknown, SetPersistedCriticalStateAction> = _createReducer(
    SetPersistedCriticalStateAction,
    (state: unknown, action: Immutable<SetPersistedCriticalStateAction>) => action.state,
)

export const SetPersistedStateReducer: Reducer<unknown, SetPersistedStateAction> = _createReducer(
    SetPersistedStateAction,
    SetPersistedCriticalStateReducer.reducerFn,
)
