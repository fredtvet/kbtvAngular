import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable, UnknownState } from '@global/interfaces';
import { StateAction } from '@state/state.action';

export const SetFetchedModelAction = "SET_FETCHED_STATE_ACTION";
export interface SetFetchedModelAction extends StateAction {
    stateProp: string;
    payload: unknown[];
}

export const SetFetchedModelReducer = _createReducer(
    SetFetchedModelAction,
    (state: unknown, action: Immutable<SetFetchedModelAction>) => {
        const newState: UnknownState = {};
        newState[action.stateProp] = action.payload;
        return newState;
    },
)