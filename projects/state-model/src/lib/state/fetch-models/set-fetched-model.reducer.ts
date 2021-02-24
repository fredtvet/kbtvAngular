import { Immutable, UnknownState } from 'global-types';
import { Reducer, StateAction, _createReducer } from 'state-management';
import { StateIsFetching, UnknownModelState } from '../../interfaces';

export const SetFetchedModelAction = "SET_FETCHED_STATE_ACTION";
export interface SetFetchedModelAction extends StateAction {
    stateProp: string;
    payload: unknown[];
}

export const SetFetchedModelReducer: Reducer<unknown, SetFetchedModelAction> = _createReducer(
    SetFetchedModelAction,
    (state: StateIsFetching<UnknownModelState>, action: Immutable<SetFetchedModelAction>) => {
        const newState: Partial<UnknownState & StateIsFetching<UnknownModelState>> = {};
        newState[action.stateProp] = action.payload;
        newState.isFetching = {...state.isFetching || {}, [action.stateProp]: false};
        return newState;
    },
)