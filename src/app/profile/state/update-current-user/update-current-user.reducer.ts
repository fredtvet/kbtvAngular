import { Reducer, StateCurrentUser } from 'src/app/state/interfaces';
import { UpdateCurrentUserActionId, UpdateCurrentUserStateCommand } from './update-current-user-state-command.interface';

export const UpdateCurrentUserReducer: Reducer<StateCurrentUser> = {
    actionId: UpdateCurrentUserActionId,
    stateProperties: ["currentUser"],
    reducerFn: (state: StateCurrentUser, action: UpdateCurrentUserStateCommand) => {
        state.currentUser = {...state.currentUser, ...action.user}
        return state;
    }
}