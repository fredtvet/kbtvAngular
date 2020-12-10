import { StateAction, Reducer } from '@state/interfaces';

export const SetFetchedStateActionId = "SET_FETCHED_STATE";

export interface SetFetchedStateCommand extends StateAction { state: Object }

export const SetFetchedStateReducer: Reducer<any, SetFetchedStateCommand> = {
    actionId: SetFetchedStateActionId,
    reducerFn: (state: any, action: SetFetchedStateCommand): any => action.state,
}