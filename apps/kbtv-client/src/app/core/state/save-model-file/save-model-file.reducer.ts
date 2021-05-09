import { SetSaveModelFileStateAction } from '@actions/global-actions';
import { _createReducer } from 'state-management';
import { ModelState } from '../model-state.interface';

export const SaveModelFileReducer = _createReducer<ModelState, SetSaveModelFileStateAction>(
    SetSaveModelFileStateAction, 
    (state, action) => action.saveModelResult.modifiedState
);


