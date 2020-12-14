import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { SetPersistedCriticalStateAction } from './actions.const';

export const SetPersistedCriticalStateReducer = _createReducer(
    SetPersistedCriticalStateAction,
    (state: any, action: Immutable<SetPersistedCriticalStateAction>) => action.state,
    false
)

export const SetPersistedStateReducer = _createReducer(
    SetPersistedCriticalStateAction,
    SetPersistedCriticalStateReducer.reducerFn,
    false
)
