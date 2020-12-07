import { User } from '@core/models';


export interface LoginResponse {
  accessToken: AccessToken;
  refreshToken: string;
  user: User;
}

export interface Tokens{
    accessToken: string;
    refreshToken: string;
}

export interface AccessToken { 
    token: string,
    expiresIn: number
}
