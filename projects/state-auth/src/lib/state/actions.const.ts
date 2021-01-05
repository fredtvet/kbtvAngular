import { StateAction } from 'state-management'
import { CurrentUser, LoginResponse, Credentials, RefreshTokenResponse, Tokens } from '../interfaces';

export const LogoutAction = "LOGOUT_ACTION";
export interface LogoutAction extends StateAction {
    refreshToken?: string, 
    returnUrl?: string
}

export const LoginSuccessAction = "LOGIN_SUCCESS_ACTION";
export interface LoginSuccessAction extends StateAction {
    response: LoginResponse,
    previousUser?: CurrentUser,
    returnUrl?: string  
}

export const LoginAction = "LOGIN_ACTION";
export interface LoginAction extends StateAction {
    credentials: Credentials,
    returnUrl?: string  
}

export const RefreshTokenSuccessAction = "REFRESH_TOKEN_SUCCESS_ACTION";
export interface RefreshTokenSuccessAction extends StateAction {
    response: RefreshTokenResponse
}

export const RefreshTokenAction = "REFRESH_TOKEN_ACTION";
export interface RefreshTokenAction extends StateAction { tokens: Tokens }

export const WipeTokensAction = "WIPE_TOKENS_ACTION"
export interface WipeTokensAction extends StateAction {};

export const UnauthorizedAction = "UNAUTHORIZED_ACTION"
