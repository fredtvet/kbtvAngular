import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, retryWhen, skip, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models';
import { ApiUrl } from '../../api-url.enum';
import { ApiService } from '../api.service';
import { DeviceInfoService } from '../device-info.service';
import { AuthStoreActions } from './auth-store-actions.enum';
import { StoreState } from './interfaces/store-state';
import { AccessToken, TokenResponse } from './interfaces/tokens.interface';
import { Credentials } from './interfaces/credentials.interface';
import { ObservableStore } from '../../observable-store/observable-store';
import { ObservableStoreBase } from '../../observable-store/observable-store-base';
import { httpRetryStrategy } from 'src/app/shared-app/http-retry.strategy';
import { _getNowInUnixTimeSeconds } from 'src/app/shared-app/helpers/datetime/get-now-in-unix-time-seconds.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ObservableStore<StoreState>{

  currentUser$: Observable<User> = this.stateProperty$<User>("currentUser"); //.pipe(distinctUntilChanged());
  newAccessToken$: Observable<AccessToken> = this.stateProperty$<AccessToken>("accessToken").pipe(skip(1));

  private _isRefreshingToken: boolean = false;//Prevent multiple refresh requests at once

  constructor (     
    base: ObservableStoreBase,
    private apiService: ApiService,
    private deviceInfoService: DeviceInfoService,
    private router: Router,
  ) {
    super(base);
  }

  get refreshToken(): string {  return this.getStateProperty<string>("refreshToken", false) }

  get accessToken(): string { return this.getStateProperty<AccessToken>("accessToken", false)?.token }

  get isRefreshingToken(): boolean { return this._isRefreshingToken }

  get hasAccessTokenExpired(): boolean{
    const expiresIn = this.getStateProperty<AccessToken>("accessToken", false)?.expiresIn
    if(!expiresIn) return true; //If no access token expiration set
    if (_getNowInUnixTimeSeconds() >= expiresIn) return true; //If access token expired
    return false;
  }

  get hasTokens(): boolean {
    return this.accessToken != null && this.refreshToken != null;
  }

  getCurrentUser(deepClone: boolean = true): User{
    return this.getStateProperty("currentUser", deepClone) 
  }

  attemptAuth$(credentials: Credentials): Observable<TokenResponse> {
    return this.apiService.post(ApiUrl.Auth + '/login', credentials).pipe(
          tap(response => this.setAuth(response)));   
  }

  refreshToken$(): Observable<TokenResponse>{
    if(this.isRefreshingToken || !this.deviceInfoService.isOnline || !this.hasTokens) return EMPTY;

    this._isRefreshingToken = true;
    
    const body = {
      accessToken: this.getStateProperty<AccessToken>("accessToken", false)?.token, 
      refreshToken: this.refreshToken
    };

    return this.apiService.post(ApiUrl.Auth + '/refresh', body)
      .pipe(
        map(tokens => {
          if(!tokens || !tokens.accessToken || !tokens.accessToken.token) return this._logout();
          this.setAccessTokenExpiration(tokens.accessToken)
          this.setState({accessToken: tokens.accessToken, refreshToken:tokens.refreshToken}, AuthStoreActions.RefreshToken)
          return tokens;
        }), 
        retryWhen(httpRetryStrategy({excludedStatusCodes: [400]})), 
        catchError(err => { this._logout(); return throwError(err) }),
        finalize(() => this._isRefreshingToken = false)
      );
  }

  logout(returnUrl?: string): void{  
    if(!this.hasAccessTokenExpired  && this.hasTokens) //Delete from server if possible to keep clean
        this.apiService.post('/Auth/logout', {refreshToken: this.refreshToken}).pipe(
          finalize(() => this._logout(returnUrl))).subscribe(); 
    else this._logout(returnUrl);
  }

  private _logout(returnUrl: string = this.router.url): void{
    this.setState({accessToken: null, refreshToken: null}, AuthStoreActions.Logout) // Set current user to an empty object 
    this.router.navigate(['/login'], { queryParams: {returnUrl}})  
  }

  private setAuth({accessToken, refreshToken, user}: TokenResponse): void {
    // Save tokens sent from server in localstorage
    accessToken = {...accessToken, token: accessToken?.token.replace("Bearer ", "")};
    this.setAccessTokenExpiration(accessToken);
    let action = AuthStoreActions.Login; 
    if(user?.userName !== this.getCurrentUser(false)?.userName) action = AuthStoreActions.NewLogin;
    this.setState({currentUser: user, accessToken, refreshToken}, action);
  }
  
  private setAccessTokenExpiration = (accessToken: AccessToken): void => {
    accessToken.expiresIn = _getNowInUnixTimeSeconds() + accessToken.expiresIn;
  }
}

