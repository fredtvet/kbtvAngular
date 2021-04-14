import { Reducer, _createReducer } from 'state-management'
import { Immutable, UnknownState } from 'global-types';
import { _deleteModelWithChildren } from '../../helpers/delete-model-with-children.helper';
import { DeleteModelAction } from './delete-model.action';

export const DeleteModelReducer: Reducer<Immutable<UnknownState>, DeleteModelAction<Immutable<UnknownState>>> = _createReducer(
    DeleteModelAction,
    (state: Immutable<UnknownState>, action: Immutable<DeleteModelAction<UnknownState>>) => 
        _deleteModelWithChildren(state, action.stateProp, {...action.payload}),
)