import { StateAction } from '@state/interfaces';

export const UpdatePasswordActionId = "UPDATE_CURRENT_USER_PASSWORD";

export interface UpdatePasswordStateCommand extends StateAction {
    oldPassword: string, 
    newPassword: string
}