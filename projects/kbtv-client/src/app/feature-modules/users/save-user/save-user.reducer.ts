
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { SaveUserAction } from './save-user.action';

export const SaveUserReducer = _createReducer(  
    SaveUserAction,
    SaveModelReducer.reducerFn
)