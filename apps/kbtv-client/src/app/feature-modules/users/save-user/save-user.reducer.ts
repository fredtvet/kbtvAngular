
import { SaveModelReducer } from 'state-model';
import { _createReducer } from 'state-management'
import { SaveUserAction } from './save-user.action';

export const SaveUserReducer = _createReducer(  
    SaveUserAction,
    SaveModelReducer.reducerFn
)