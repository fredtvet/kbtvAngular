import { StateAction } from 'state-management'

export const UpdatePasswordAction = "UPDATE_PASSWORD_ACTION";
export interface UpdatePasswordAction extends StateAction {
    oldPassword: string, 
    newPassword: string
}