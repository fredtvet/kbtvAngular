import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper';
import { Immutable } from '@immutable/interfaces';
import { ActionDispatcher } from '@state/action-dispatcher';
import { Store } from '@state/store';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { Credentials } from './interfaces/credentials.interface';
import { StoreState } from './interfaces/store-state';
import { AccessToken } from './interfaces/tokens.interface';
import { LoginAction } from './state/login.http.effect';
import { LogoutAction } from './state/logout/logout.action';
import { RefreshTokenAction } from './state/refresh-token.http.effect';

@Injectable({providedIn: 'root'})
export class AuthService {

  isAuthorized$: Observable<boolean> = this.store.select$(["accessToken", "refreshToken"]).pipe(
    map(state => (state.refreshToken != null) && (state.accessToken?.token != null))
  )

  currentUser$ = this.store.selectProperty$<User>("currentUser");

  newAccessToken$ = 
    this.store.selectProperty$<AccessToken>("accessToken").pipe(skip(1));

  get hasAccessTokenExpired(): boolean{
    const expiresIn = 
      this.store.selectProperty<AccessToken>("accessToken")?.expiresIn

    if(!expiresIn) return true; //If no access token expiration set
    if (_getUnixTimeSeconds() >= expiresIn) return true; //If access token expired
    return false;
  }

  get isAuthorized(): boolean {
    return this.getAccessToken() != null && this.getRefreshToken() != null;
  }

  constructor (private store: Store<StoreState>, private actionDispatcher: ActionDispatcher) { }

  getAccessToken = (): string => 
    this.store.selectProperty<AccessToken>("accessToken")?.token 

  getCurrentUser = (): Immutable<User> => 
    this.store.selectProperty<User>("currentUser") 
  
  login = (credentials: Credentials, returnUrl?: string): void => 
    this.store.dispatch(new LoginAction(credentials, returnUrl))
  
  logout = (returnUrl?: string): void =>
    this.store.dispatch(new LogoutAction(this.getRefreshToken(), returnUrl))
  
  refreshToken = (): void => 
    this.store.dispatch(new RefreshTokenAction({
      accessToken: this.getAccessToken(), 
      refreshToken: this.getRefreshToken()
    }))

  private getRefreshToken = (): string => 
    this.store.selectProperty<string>("refreshToken") 
}

