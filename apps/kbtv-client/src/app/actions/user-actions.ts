import { User } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { StateAction } from "state-management";
import { SaveModelAction, SetSaveModelStateAction } from 'model/state-commands';

export const UpdateUserPasswordAction = "UPDATE_USER_PASSWORD_ACTION";
export interface UpdateUserPasswordAction extends StateAction<typeof UpdateUserPasswordAction> {
    newPassword: string, 
    userName: string
}

export const SaveUserAction = "SAVE_USER_ACTION";
export interface SaveUserAction extends Omit<SaveModelAction<ModelState, User>, "type">{
    password: string,
    type: typeof SaveUserAction
}

export const SetSaveUserStateAction = "SET_SAVE_USER_ACTION";
export interface SetSaveUserStateAction extends Omit<SetSaveModelStateAction<ModelState, User>, "type">{
    password: string,
    type: typeof SetSaveUserStateAction
}