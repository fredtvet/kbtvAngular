import { Immutable, UnknownState } from 'global-types';
import { Reducer, StateAction, _createReducer } from 'state-management';
import { StateFetchedModels, UnknownModelState } from '../../interfaces';

export const SetFetchedModelAction = "SET_FETCHED_STATE_ACTION";
export interface SetFetchedModelAction extends StateAction {
    stateProp: string;
    payload: unknown[];
}

export const SetFetchedModelReducer: Reducer<unknown, SetFetchedModelAction> = _createReducer(
    SetFetchedModelAction,
    (state: StateFetchedModels<UnknownModelState>, action: Immutable<SetFetchedModelAction>) => {
        const newState: Partial<UnknownState & StateFetchedModels<UnknownModelState>> = {};
        newState[action.stateProp] = action.payload;
        newState.fetchedModels = {...state.fetchedModels || {}, [action.stateProp]: true};
        return newState;
    },
)