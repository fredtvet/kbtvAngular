import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { _deleteModelWithChildren } from '../../helpers/delete-model-with-children.helper';
import { DeleteModelAction } from './delete-model.action';

export const DeleteModelReducer= _createReducer(
    DeleteModelAction,
    (state: Immutable<any>, action: Immutable<DeleteModelAction<any>>) => 
        _deleteModelWithChildren(state, action.stateProp, {...action.payload}),
)