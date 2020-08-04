import { Injectable } from '@angular/core';
import { Observable, throwError, of, Subject, EMPTY } from 'rxjs';
import { ApiService } from '../api.service';
import { IdentityTokensService } from './identity-tokens.service';
import { map, distinctUntilChanged, tap, take, catchError, finalize } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { DeviceInfoService } from '../device-info.service';
import { NotificationService } from '../ui/notification.service';
import { DataSyncService } from '../data/data-sync.service';
import { DateTimeService } from '../utility/date-time.service';
import { PersistentSubject } from '../data/abstracts/persistent.subject';
import { User } from 'src/app/core/models';
import { TokenResponse, Credentials } from 'src/app/shared-app/interfaces';
import { Router } from '@angular/router';
import { Notifications } from 'src/app/shared-app/enums';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends PersistentSubject<User>{

  currentUser$: Observable<User> = this.data$.pipe(distinctUntilChanged());

  private refreshedAccessToken: Subject<string> = new Subject<string>();
  refreshedAccessToken$ = this.refreshedAccessToken.asObservable();

  private _isRefreshingToken: boolean = false;//Prevent multiple refresh requests at once

  private isOnline: boolean = true;

  constructor (     
    localStorageService: LocalStorageService,
    private dateTimeService: DateTimeService,
    private apiService: ApiService,
    private tokensService: IdentityTokensService,
    private dataSyncService: DataSyncService,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    super(localStorageService, "identity");

    this.deviceInfoService.isOnline$.subscribe(res =>this.isOnline = res)
  }

  get currentUser() { return this.dataSubject.value }
  
  get isRefreshingToken() { return this._isRefreshingToken }

  attemptAuth$(credentials: Credentials): Observable<User> {
    return this.apiService.post('/Auth/login', credentials)
      .pipe(map(tokenResponse => {
        this.setAuth(tokenResponse);
        return tokenResponse.user;
      }
    ));
  }

  refreshToken$(): Observable<TokenResponse>{
    if(this.isRefreshingToken || !this.isOnline || !this.hasTokens()) return EMPTY;

    this._isRefreshingToken = true;

    var tokens = this.tokensService.getTokens();

    return this.apiService.post('/Auth/refresh', {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken})
      .pipe(
        map(tokens => {
          if(!tokens || !tokens.accessToken || !tokens.accessToken.token)  return this._logout();
          this.setAuth(tokens);
          this.refreshedAccessToken.next(tokens.accessToken.token);
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
    let refreshToken = this.tokensService.getRefreshToken();

    if(this.isOnline && !this.hasAccessTokenExpired()  && this.hasTokens()) //Delete from server if possible to keep clean
        this.apiService.post('/Auth/logout', {refreshToken}).pipe(
          finalize(() => this._logout(returnUrl))).subscribe(); 
    else this._logout(returnUrl);
  }

  populate(): void{
    if(this.hasTokens() && this.isOnline)
        this.apiService.get('/auth').subscribe(data => this.dataSubject.next(data));
  }
 
  hasAccessTokenExpired(): boolean{
    let tokenExpiration = this.tokensService.getAccessTokenExpiration();

    if(!tokenExpiration) return true; //If no access token expiration set

    var now =  this.dateTimeService.getNowInUnixTimeSeconds();

    if (now >= tokenExpiration) return true; //If access token expired
  
    return false;
  }

  hasTokens(): boolean{
    let tokens = this.tokensService.getTokens();
    return !this.isUndefinedOrNull(tokens) && !this.isUndefinedOrNull(tokens.accessToken) && !this.isUndefinedOrNull(tokens.refreshToken);
  }

  hasRefreshToken = (): boolean => 
    !this.isUndefinedOrNull(this.tokensService.getRefreshToken())

  getAccessToken = () => this.tokensService.getAccessToken();

  updateCurrentUser$(user: User): Observable<User> {
    return this.apiService
    .put('/auth', user)
    .pipe(map(data => {
      data.role = this.dataSubject.value.role;
      this.dataSubject.next(data);
      return data;
    }));
  }

  changePassword$(oldPw: string, newPw: string){
    const obj = {
      OldPassword: oldPw,
      NewPassword: newPw
    }
    return this.apiService
      .put('/auth/changePassword', obj);
  }

  private _logout(returnUrl: string = this.router.url): void{
    this.dataSyncService.purgeAll(); //Clearing resources to prevent leaking data if new user logs in
    this.tokensService.destroyTokens();
    this.dataSubject.next({} as User);  // Set current user to an empty object 
    this.router.navigate(['/login'], { queryParams: {returnUrl}})  
  }

  private setAuth(tokenResponse: TokenResponse) {
    // Save tokens sent from server in localstorage
    let accessToken = tokenResponse.accessToken.token.replace("Bearer ", "");
    let accessTokenExpiration = this.dateTimeService.getNowInUnixTimeSeconds() + tokenResponse.accessToken.expiresIn;
    this.tokensService.saveTokens(accessToken, accessTokenExpiration, tokenResponse.refreshToken);

    // Set current user data into observable
    if(tokenResponse.user) this.dataSubject.next(tokenResponse.user);
  }

  private isUndefinedOrNull = (val: any): boolean => val == undefined || val == null;

}
