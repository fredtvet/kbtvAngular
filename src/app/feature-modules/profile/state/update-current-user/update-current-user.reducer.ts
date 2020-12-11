import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { Reducer } from '@state/interfaces';
import { UpdateCurrentUserAction } from './update-current-user.action';

export const UpdateCurrentUserReducer: Reducer<StateCurrentUser, UpdateCurrentUserAction> = {
    action: UpdateCurrentUserAction,
    stateProperties: ["currentUser"],
    reducerFn: (state: StateCurrentUser, action: UpdateCurrentUserAction) => {
        state.currentUser = {...state.currentUser, ...action.user}
        return state;
    }
}