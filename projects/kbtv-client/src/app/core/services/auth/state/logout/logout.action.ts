import { StateAction } from '@state/state.action'

export const LogoutAction = "LOGOUT_ACTION";
export interface LogoutAction extends StateAction {
    refreshToken?: string, 
    returnUrl?: string
}