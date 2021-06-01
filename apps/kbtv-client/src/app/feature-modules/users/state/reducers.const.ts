import { ModelState } from '@core/state/model-state.interface';
import { _createReducer } from 'state-management';
import { SetSaveUserStateAction } from './actions.const';

export const SetSaveUserStateReducer = _createReducer<ModelState, SetSaveUserStateAction>(  
    SetSaveUserStateAction,
    (s, action) => action.saveModelResult.modifiedState 
)