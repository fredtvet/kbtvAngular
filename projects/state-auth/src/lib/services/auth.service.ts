import { Inject, Injectable } from '@angular/core';
import { _getUnixTimeSeconds } from 'date-time-helpers';
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { select, Store } from 'state-management';
import { AUTH_COMMAND_API_MAP } from '../injection-tokens.const';
import { AccessToken, AuthCommandApiMap, Credentials, CurrentUser, StoreState } from '../interfaces';
import { LoginAction, LogoutAction, RefreshTokenAction } from '../state/actions.const';

@Injectable({providedIn: 'root'})
export class AuthService {

  isAuthorized$: Observable<boolean> = this.store.state$.pipe(
    select(["accessToken", "refreshToken"]),
    map(state => state != null && state.refreshToken != null && state.accessToken?.token != null)
  )

  currentUser$: Observable<CurrentUser> = this.store.selectProperty$<CurrentUser>("currentUser");

  newAccessToken$: Observable<AccessToken> = 
    this.store.selectProperty$<AccessToken>("accessToken").pipe(skip(1));

  get hasAccessTokenExpired(): boolean{
    const expiresIn = this.store.state.accessToken?.expiresIn

    if(!expiresIn) return true; //If no access token expiration set
    if (_getUnixTimeSeconds() >= expiresIn) return true; //If access token expired
    return false;
  }

  get isAuthorized(): boolean {
    return this.getAccessToken() != null && (this.commandApiMap.REFRESH_TOKEN_ACTION != null || !this.hasAccessTokenExpired);
  }

  constructor (
    private store: Store<StoreState>,
    @Inject(AUTH_COMMAND_API_MAP) private commandApiMap: AuthCommandApiMap,
  ) {}

  getAccessToken = (): Maybe<string> => 
    this.store.state.accessToken?.token 

  getCurrentUser = (): Maybe<Immutable<CurrentUser>> => 
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

