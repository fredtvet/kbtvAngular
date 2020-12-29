import { Immutable } from 'global-types';
import { _createReducer } from 'state-management'
import { SetPersistedCriticalStateAction, SetPersistedStateAction } from './actions.const';

export const SetPersistedCriticalStateReducer = _createReducer(
    SetPersistedCriticalStateAction,
    (state: unknown, action: Immutable<SetPersistedCriticalStateAction>) => action.state,
)

export const SetPersistedStateReducer = _createReducer(
    SetPersistedStateAction,
    SetPersistedCriticalStateReducer.reducerFn,
)
