import { User } from '@core/models';
import { StateAction } from 'state-management'

export const UpdateCurrentUserAction = "UPDATE_CURRENT_USER_ACTION";
export interface UpdateCurrentUserAction extends StateAction{
    user: User
}