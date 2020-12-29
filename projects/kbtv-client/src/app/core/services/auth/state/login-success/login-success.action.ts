import { User } from '@core/models';
import { StateAction } from 'state-management'
import { LoginResponse } from '../../interfaces';

export const LoginSuccessAction = "LOGIN_SUCCESS_ACTION";
export interface LoginSuccessAction extends StateAction {
    response: LoginResponse,
    previousUser?: User,
    returnUrl?: string  
}