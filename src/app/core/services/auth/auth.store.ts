import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models';
import { AccessToken, Credentials, TokenResponse } from 'src/app/shared-app/interfaces';
import { ApiUrl } from '../../api-url';
import { BaseModelStore } from '../../state';
import { ApiService } from '../api.service';
import { DeviceInfoService } from '../device-info.service';
import { ArrayHelperService } from '../utility/array-helper.service';
import { DateTimeService } from '../utility/date-time.service';
import { AuthStoreActions } from './auth-store-actions.enum';
import { StoreState } from './store-state';
import { PersistanceStore } from '../persistance/persistance.store';
import { SyncStore } from '../sync';

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends BaseModelStore<StoreState>{

  currentUser$: Observable<User> = this.property$<User>("currentUser"); //.pipe(distinctUntilChanged());
  newAccessToken$: Observable<AccessToken> = this.propertyChanges$<AccessToken>("accessToken");

  private _isRefreshingToken: boolean = false;//Prevent multiple refresh requests at once

  constructor (     
    arrayHelperService: ArrayHelperService,
    apiService: ApiService,
    private dateTimeService: DateTimeService,
    private deviceInfoService: DeviceInfoService,
    private router: Router,
    private persistanceStore: PersistanceStore,
    private syncStore: SyncStore,
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
    this.persistanceStore.authStateInitalized$
      .subscribe(x => { if(this.hasTokens){this.syncStore.syncAll(); this.populate(); }})
  }

  get currentUser(): User { return this.getProperty("currentUser") }

  get refreshToken(): string {  return this.getProperty<string>("refreshToken") }

  get accessToken(): string { return this.getProperty<AccessToken>("accessToken")?.token }

  get accessTokenExpiresIn(): number { return this.getProperty<AccessToken>("accessToken")?.expiresIn }

  get isRefreshingToken(): boolean { return this._isRefreshingToken }

  get hasAccessTokenExpired(): boolean{
    if(!this.accessTokenExpiresIn) return true; //If no access token expiration set

    var now =  this.dateTimeService.getNowInUnixTimeSeconds();

    if (now >= this.accessTokenExpiresIn) return true; //If access token expired
  
    return false;
  }

  get hasTokens(): boolean {
    return this.accessToken != null && this.refreshToken != null;
  }

  attemptAuth$(credentials: Credentials): Observable<TokenResponse> {
    return this.apiService.post(ApiUrl.Auth + '/login', credentials).pipe(
          tap(response => this.setAuth(response)));   
  }

  refreshToken$(): Observable<TokenResponse>{
    if(this.isRefreshingToken || !this.deviceInfoService.isOnline || !this.hasTokens) return EMPTY;

    this._isRefreshingToken = true;

    return this.apiService.post(ApiUrl.Auth + '/refresh', {accessToken: this.accessToken, refreshToken: this.refreshToken})
      .pipe(
        map(tokens => {
          if(!tokens || !tokens.accessToken || !tokens.accessToken.token) return this._logout();
          this._setStateVoid({accessToken: tokens.accessToken, refreshToken:tokens.refreshToken}, AuthStoreActions.RefreshToken)
          return tokens;
        }), 
        catchError(err => { //If refresh returns errors, logout
          this._logout();
          return throwError(err);
        }),
        finalize(() => {
            this._isRefreshingToken = false;
        })
      );
  }

  logout(returnUrl?: string): void{  
    if(!this.hasAccessTokenExpired  && this.hasTokens) //Delete from server if possible to keep clean
        this.apiService.post('/Auth/logout', {refreshToken: this.refreshToken}).pipe(
          finalize(() => this._logout(returnUrl))).subscribe(); 
    else this._logout(returnUrl);
  }

  private _logout(returnUrl: string = this.router.url): void{
    this.syncStore.handleLogout();
    this._setStateVoid({currentUser: null, accessToken: null, refreshToken: null}, AuthStoreActions.Logout) // Set current user to an empty object 
    this.router.navigate(['/login'], { queryParams: {returnUrl}})  
  }

  private setAuth(response: TokenResponse): void {
    if(!response) return; 
    // Save tokens sent from server in localstorage
    let accessToken: AccessToken = {
        token: response.accessToken?.token.replace("Bearer ", ""),
        expiresIn: this.dateTimeService.getNowInUnixTimeSeconds() + response.accessToken?.expiresIn
    };

    this._setStateVoid({currentUser: response.user, accessToken, refreshToken: response.refreshToken}, AuthStoreActions.Login);
    this.syncStore.handleLogin();
  }

  private populate(): void{
    if(this.hasTokens)
        this.apiService.get('/auth').subscribe(currentUser => this._setStateVoid({currentUser}, AuthStoreActions.SetCurrentUser));
  }
}

