import { User } from '@core/models';
import { StateAction } from '@state/interfaces';
import { LoginResponse } from '../..';

export const LoginSuccessActionId = "LOGIN_SUCCESS"

export interface LoginSuccessCommand extends StateAction, LoginResponse { 
    previousUser?: User
    returnUrl?: string
}