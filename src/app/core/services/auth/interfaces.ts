import { StateCurrentUser } from 'src/app/state/interfaces';
import { User } from 'src/app/core/models';

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
