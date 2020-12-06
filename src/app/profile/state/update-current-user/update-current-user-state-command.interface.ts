import { User } from 'src/app/core/models';
import { StateAction } from 'src/app/state/interfaces';

export const UpdateCurrentUserActionId = "UPDATE_CURRENT_USER"

export interface UpdateCurrentUserStateCommand extends StateAction{
    user: User;
}