import { User } from 'src/app/core/models';


export interface TokenResponse {
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
