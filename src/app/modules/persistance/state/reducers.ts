import { Immutable } from '@immutable/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { SetPersistedCriticalStateAction, SetPersistedStateAction } from './actions.const';

export const SetPersistedCriticalStateReducer = _createReducer(
    SetPersistedCriticalStateAction,
    (state: any, action: Immutable<SetPersistedCriticalStateAction>) => action.state,
)

export const SetPersistedStateReducer = _createReducer(
    SetPersistedStateAction,
    SetPersistedCriticalStateReducer.reducerFn,
)
