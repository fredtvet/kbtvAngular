import { User } from '@core/models';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';
import { LoginResponse } from '../../interfaces';

export const LoginSuccessAction = "LOGIN_SUCCESS_ACTION";
export interface LoginSuccessAction extends StateAction {
    response: LoginResponse,
    previousUser?: Immutable<User>,
    returnUrl?: string  
}