import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { Reducer } from '@state/interfaces';
import { UpdateCurrentUserActionId, UpdateCurrentUserStateCommand } from './update-current-user-state-command.interface';

export const UpdateCurrentUserReducer: Reducer<StateCurrentUser, UpdateCurrentUserStateCommand> = {
    actionId: UpdateCurrentUserActionId,
    stateProperties: ["currentUser"],
    reducerFn: (state: StateCurrentUser, action: UpdateCurrentUserStateCommand) => {
        state.currentUser = {...state.currentUser, ...action.user}
        return state;
    }
}