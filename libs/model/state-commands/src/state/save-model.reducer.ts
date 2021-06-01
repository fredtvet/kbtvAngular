import { Immutable, UnknownState } from 'global-types';
import { Reducer, _createReducer } from 'state-management';
import { SetSaveModelStateAction } from '../actions';

export const SaveModelReducer: Reducer<Immutable<UnknownState>, SetSaveModelStateAction<any, any>> = _createReducer(
    SetSaveModelStateAction,
    (state, command) => command.saveModelResult.modifiedState
)
