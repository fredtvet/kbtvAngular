
import { SetSaveUserStateAction } from '@actions/user-actions';
import { ModelState } from '@core/state/model-state.interface';
import { _createReducer } from 'state-management';

export const SetSaveUserStateReducer = _createReducer<ModelState, SetSaveUserStateAction>(  
    SetSaveUserStateAction,
    (s, action) => action.saveModelResult.modifiedState 
)