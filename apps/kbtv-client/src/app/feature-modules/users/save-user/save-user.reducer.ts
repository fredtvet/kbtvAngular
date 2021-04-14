
import { SaveModelReducer } from 'model/state';
import { _createReducer } from 'state-management'
import { SaveUserAction } from '@actions/user-actions';

export const SaveUserReducer = _createReducer(  
    SaveUserAction,
    SaveModelReducer.reducerFn
)