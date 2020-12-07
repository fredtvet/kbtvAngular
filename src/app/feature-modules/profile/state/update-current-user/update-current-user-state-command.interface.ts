import { User } from '@core/models';
import { StateAction } from '@state/interfaces';

export const UpdateCurrentUserActionId = "UPDATE_CURRENT_USER"

export interface UpdateCurrentUserStateCommand extends StateAction{
    user: User;
}