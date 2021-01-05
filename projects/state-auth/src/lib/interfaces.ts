import { LoginAction, LogoutAction, RefreshTokenAction } from "./state/actions.const";

export interface AuthRouteData { allowedRoles?: string[] }

export interface AuthCommandApi<TBody, TResponse> { 
    apiUrl: string, 
    method: string, 
    bodyFormatter?: (t: TBody) => unknown,
    responseFormatter?: (t: unknown) => TResponse
}

export interface AuthCommandApiMap {
    [RefreshTokenAction]?: AuthCommandApi<Tokens, RefreshTokenResponse>,
    [LoginAction]: AuthCommandApi<Credentials, LoginResponse>,
    [LogoutAction]: AuthCommandApi<{refreshToken: string}, void>
}

export interface DefaultRedirects{
    home: string, login: string
}

export interface StoreState extends
    StateCurrentUser {
        accessToken: AccessToken,
        refreshToken: string
}

export interface StateCurrentUser { currentUser: CurrentUser }


export interface CurrentUser { userName: string, role: string }

export interface LoginResponse {
    accessToken: AccessToken;
    refreshToken: string;
    user: CurrentUser;
}

export interface RefreshTokenResponse {
    accessToken: AccessToken;
    refreshToken: string;
}

export interface Credentials{
    userName: string;
    password: string;
}

export interface Tokens{
    accessToken: string;
    refreshToken: string;
}

export interface AccessToken { 
    token: string,
    expiresIn: number
}
