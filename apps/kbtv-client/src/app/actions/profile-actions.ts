import { User } from "@core/models";
import { StateAction } from "state-management";

export const ClearAndLogoutAction = "CLEAR_AND_LOGOUT_ACTION";
export interface ClearAndLogoutAction extends StateAction {}

export const UpdateCurrentUserAction = "UPDATE_CURRENT_USER_ACTION";
export interface UpdateCurrentUserAction extends StateAction{
    user: User
}

export const UpdatePasswordAction = "UPDATE_PASSWORD_ACTION";
export interface UpdatePasswordAction extends StateAction {
    oldPassword: string, 
    newPassword: string
}