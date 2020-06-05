import { User } from '../interfaces/models/user.interface';

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
