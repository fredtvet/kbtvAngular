import { User } from 'src/app/core/models';
import { StateAction } from 'src/app/state/interfaces';
import { LoginResponse } from '../..';

export const LoginSuccessActionId = "LOGIN_SUCCESS"

export interface LoginSuccessCommand extends StateAction, LoginResponse { 
    previousUser?: User
    returnUrl?: string
}