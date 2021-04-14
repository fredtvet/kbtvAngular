import { User } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { StateAction } from "state-management";
import { SaveModelAction } from "state-model";

export const UpdateUserPasswordAction = "UPDATE_USER_PASSWORD_ACTION";
export interface UpdateUserPasswordAction extends StateAction {
    newPassword: string, 
    userName: string
}

export const SaveUserAction = SaveModelAction+"_USER";
export interface SaveUserAction extends SaveModelAction<User, ModelState>{
    password: string,
}