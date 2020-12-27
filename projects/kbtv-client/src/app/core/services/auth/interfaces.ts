import { User } from '@core/models';
import { StateCurrentUser } from '@core/state/global-state.interfaces';

export interface StoreState extends
    StateCurrentUser {
        accessToken: AccessToken,
        refreshToken: string
}

export interface LoginResponse {
    accessToken: AccessToken;
    refreshToken: string;
    user: User;
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