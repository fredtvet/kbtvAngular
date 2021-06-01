import { User } from "@core/models";
import { CurrentUser } from "state-auth";
import { StateAction } from "state-management";

export const ClearAndLogoutAction = "CLEAR_AND_LOGOUT_ACTION";
export interface ClearAndLogoutAction extends StateAction<typeof ClearAndLogoutAction> {}

export const UpdateCurrentUserAction = "UPDATE_CURRENT_USER_ACTION";
export interface UpdateCurrentUserAction extends StateAction<typeof UpdateCurrentUserAction>{
    user: Partial<User & CurrentUser>,
    type: typeof UpdateCurrentUserAction
}

export const UpdatePasswordAction = "UPDATE_PASSWORD_ACTION";
export interface UpdatePasswordAction extends StateAction<typeof UpdatePasswordAction> {
    oldPassword: string, 
    newPassword: string
}