import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable, UnknownState } from 'global-types';
import { _deleteModelWithChildren } from '../../helpers/delete-model-with-children.helper';
import { DeleteModelAction } from './delete-model.action';

export const DeleteModelReducer = _createReducer(
    DeleteModelAction,
    (state: Immutable<UnknownState>, action: Immutable<DeleteModelAction<UnknownState>>) => 
        _deleteModelWithChildren(state, action.stateProp, {...action.payload}),
)