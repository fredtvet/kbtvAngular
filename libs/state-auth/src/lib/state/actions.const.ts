import { StateAction } from 'state-management'
import { CurrentUser, LoginResponse, Credentials, RefreshTokenResponse, Tokens } from '../interfaces';

export const LogoutAction = "LOGOUT_ACTION";
/** Represents an action used to logout the current user */
export interface LogoutAction extends StateAction<typeof LogoutAction> {
    /** The refresh token so external api can clean up old tokens */
    refreshToken?: string, 
    /** A return url used if the user logs in again */
    returnUrl?: string
}

export const LoginSuccessAction = "LOGIN_SUCCESS_ACTION";
/** Represents the action dispatched when a successful login attempt has been made */
export interface LoginSuccessAction extends StateAction<typeof LoginSuccessAction> {
    /** The response from the external api */
    response: LoginResponse,
    /** The previous user that was active in the system */
    previousUser?: CurrentUser,
    /** A router url used to redirect the user after login */
    returnUrl?: string  
}

export const LoginAction = "LOGIN_ACTION";
/** Represents the action used to login a user */
export interface LoginAction extends StateAction<typeof LoginAction> {
    credentials: Credentials,
    /** A router url used to redirect the user after login */
    returnUrl?: string  
}

export const RefreshTokenSuccessAction = "REFRESH_TOKEN_SUCCESS_ACTION";
export interface RefreshTokenSuccessAction extends StateAction<typeof RefreshTokenSuccessAction> {
    response: RefreshTokenResponse
}

export const RefreshTokenAction = "REFRESH_TOKEN_ACTION";
export interface RefreshTokenAction extends StateAction<typeof RefreshTokenAction> { tokens: Tokens }

export const WipeTokensAction = "WIPE_TOKENS_ACTION"
/** Represents the action responsible for removing tokens from state */
export interface WipeTokensAction extends StateAction<typeof WipeTokensAction> {};

export const UnauthorizedAction = "UNAUTHORIZED_ACTION"
