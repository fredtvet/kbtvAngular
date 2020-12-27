import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper';
import { Immutable, Maybe } from '@global/interfaces';
import { _selectSlice } from '@state/helpers/select-slice.helper';
import { select, selectProp } from '@state/operators/selectors.operator';
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

  isAuthorized$: Observable<boolean> = this.store.state$.pipe(
    select(["accessToken", "refreshToken"]),
    map(state => state != null && state.refreshToken != null && state.accessToken?.token != null)
  )

  currentUser$ = this.store.selectProperty$<User>("currentUser");

  newAccessToken$ = 
    this.store.selectProperty$<AccessToken>("accessToken").pipe(skip(1));

  get hasAccessTokenExpired(): boolean{
    const expiresIn = this.store.state.accessToken?.expiresIn

    if(!expiresIn) return true; //If no access token expiration set
    if (_getUnixTimeSeconds() >= expiresIn) return true; //If access token expired
    return false;
  }

  get isAuthorized(): boolean {
    return this.getAccessToken() != null && this.getRefreshToken() != null;
  }

  constructor (private store: Store<StoreState>) {}

  getAccessToken = (): Maybe<string> => 
    this.store.state.accessToken?.token 

  getCurrentUser = (): Maybe<Immutable<User>> => 
    this.store.state.currentUser 
  
  login = (credentials: Credentials, returnUrl?: string): void => 
    this.store.dispatch(<LoginAction>{ type: LoginAction, credentials, returnUrl })
  
  logout = (returnUrl?: string): void =>
    this.store.dispatch(<LogoutAction>{ type: LogoutAction, refreshToken: this.getRefreshToken(), returnUrl })
  
  refreshToken = (): void => 
    this.store.dispatch(<RefreshTokenAction>{ type: RefreshTokenAction,
      tokens: {
        accessToken: this.getAccessToken(), 
        refreshToken: this.getRefreshToken()
      }
    })

  private getRefreshToken = (): Maybe<string> => 
    this.store.state.refreshToken 
}

