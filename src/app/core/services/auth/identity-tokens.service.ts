import { Injectable } from '@angular/core';
import { Tokens } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class IdentityTokensService {

  private readonly ACCESS_TOKEN = "accessToken";
  private readonly ACCESS_TOKEN_EXPIRATION = "accessTokenExpiration";
  private readonly REFRESH_TOKEN = "refreshToken";

  getTokens(): Tokens {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    }
  }

  getAccessToken = (): string => window.localStorage[this.ACCESS_TOKEN];

  getAccessTokenExpiration = (): number => +window.localStorage[this.ACCESS_TOKEN_EXPIRATION];
  
  getRefreshToken = (): string => window.localStorage[this.REFRESH_TOKEN];
  
  saveTokens(accessToken: string, accessTokenExpiration: number, refreshToken: string) {
    this.saveAccessToken(accessToken, accessTokenExpiration);
    window.localStorage[this.REFRESH_TOKEN] = refreshToken;
  }

  saveAccessToken(token: string, expiration: number) {
    window.localStorage[this.ACCESS_TOKEN] = token;
    window.localStorage[this.ACCESS_TOKEN_EXPIRATION] = expiration;
  }

  destroyTokens() {
    window.localStorage.removeItem(this.ACCESS_TOKEN); 
    window.localStorage.removeItem(this.ACCESS_TOKEN_EXPIRATION); 
    window.localStorage.removeItem(this.REFRESH_TOKEN);
  }

}
