import { Reducer, _createReducer } from 'state-management';
import { SetPersistedStateAction } from './actions.const';

export const SetPersistedStateReducer: Reducer<unknown, SetPersistedStateAction> = _createReducer(
    SetPersistedStateAction, (state, action) => action.state,
)
