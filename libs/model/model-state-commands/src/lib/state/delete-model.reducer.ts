import { Reducer, _createReducer } from 'state-management'
import { Immutable, UnknownState } from 'global-types';
import { DeleteModelAction } from '../actions';
import { _deleteModel } from 'model/core';

export const DeleteModelReducer: Reducer<Immutable<UnknownState>, DeleteModelAction<any,any>> = _createReducer(
    DeleteModelAction,
    (state, action) => 
        _deleteModel<any,any>(state, action.stateProp, {...action.payload}),
)