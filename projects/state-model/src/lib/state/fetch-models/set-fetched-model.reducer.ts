import { Immutable, UnknownState } from 'global-types';
import { Reducer, StateAction, _createReducer } from 'state-management';

export const SetFetchedModelAction = "SET_FETCHED_STATE_ACTION";
export interface SetFetchedModelAction extends StateAction {
    stateProp: string;
    payload: unknown[];
}

export const SetFetchedModelReducer: Reducer<unknown, SetFetchedModelAction> = _createReducer(
    SetFetchedModelAction,
    (state: unknown, action: Immutable<SetFetchedModelAction>) => {
        const newState: UnknownState = {};
        newState[action.stateProp] = action.payload;
        return newState;
    },
)