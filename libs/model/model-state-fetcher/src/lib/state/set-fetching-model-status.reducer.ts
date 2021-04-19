import { Prop } from 'global-types';
import { UnknownModelState } from 'model/core';
import { Reducer, StateAction, _createReducer } from 'state-management';
import { StateIsFetching } from '../interfaces';

export const SetFetchingModelStatusAction = "SET_FETCHING_MODEL_STATUS_ACTION";
export interface SetFetchingModelStatusAction<TState = UnknownModelState> extends StateAction {
    isFetching: Record<Prop<TState>, boolean>
}

export const SetFetchingModelStatusReducer: Reducer<unknown, SetFetchingModelStatusAction> = _createReducer(
    SetFetchingModelStatusAction,
    (state: StateIsFetching<UnknownModelState>, action) => {
        return { isFetching: {...state.isFetching || {}, ...action.isFetching} };
    },
)