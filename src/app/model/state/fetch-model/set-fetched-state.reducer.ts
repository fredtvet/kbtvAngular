import { StateAction } from 'src/app/state/interfaces';
import { Reducer } from '../../../state/interfaces/reducer.interface';

export const SetFetchedStateActionId = "SET_FETCHED_STATE";

export interface SetFetchedStateCommand extends StateAction { state: Object }

export const SetFetchedStateReducer: Reducer<any> = {
    actionId: SetFetchedStateActionId,
    reducerFn: (state: any, action: SetFetchedStateCommand): any => action.state,
}