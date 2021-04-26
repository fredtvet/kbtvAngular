
import { SaveModelReducer } from 'model/state-commands';
import { ReducerFn, _createReducer } from 'state-management'
import { SaveUserAction } from '@actions/user-actions';
import { ModelState } from '@core/state/model-state.interface';

export const SaveUserReducer = _createReducer<ModelState, SaveUserAction>(  
    SaveUserAction,
    <ReducerFn<ModelState, SaveUserAction>> SaveModelReducer.reducerFn
)