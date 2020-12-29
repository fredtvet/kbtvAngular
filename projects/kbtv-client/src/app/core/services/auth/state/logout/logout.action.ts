import { StateAction } from 'state-management'

export const LogoutAction = "LOGOUT_ACTION";
export interface LogoutAction extends StateAction {
    refreshToken?: string, 
    returnUrl?: string
}