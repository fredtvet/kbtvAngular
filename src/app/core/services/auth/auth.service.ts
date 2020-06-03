import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { ApiService } from '../api.service';
import { IdentityTokensService } from './identity-tokens.service';
import { map, distinctUntilChanged, tap, take, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { DeviceInfoService } from '../device-info.service';
import { NotificationService } from '../ui/notification.service';
import { DataSyncService } from '../data/data-sync.service';
import { DateTimeService } from '../utility/date-time.service';
import { PersistentSubject } from '../data/abstracts/persistent.subject';
import { Notifications } from 'src/app/shared/enums';
import { User } from 'src/app/shared/models';
import { TokenResponse, Credentials } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends PersistentSubject<User>{

  public currentUser$: Observable<User> = this.data$.pipe(distinctUntilChanged());

  private isOnline: boolean = true;

  constructor (     
    localStorageService: LocalStorageService,
    private dateTimeService: DateTimeService,
    private apiService: ApiService,
    private tokensService: IdentityTokensService,
    private dataSyncService: DataSyncService,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
  ) {
    super(localStorageService, "identity", new User());

    this.deviceInfoService.isOnline$.subscribe(res =>this.isOnline = res)
  }

  get currentUser() {
    return this.dataSubject.value
  }

  attemptAuth$(credentials: Credentials): Observable<User> {
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å logge inn.')
      .pipe(take(1), tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService.post('/Auth/login', credentials)
      .pipe(map(tokenResponse => {
        this.setAuth(tokenResponse);
        return tokenResponse.user;
      }
    ));
  }

  refreshToken$(): Observable<TokenResponse>{
    if(!this.isOnline || !this.hasTokens()) return of(undefined);
    var tokens = this.tokensService.getTokens();
    return this.apiService.post('/Auth/refresh', {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken})
      .pipe(map(tokenResponse => {
        this.setAuth(tokenResponse);
        return tokenResponse;
      }
    ));
  }

  logout(): void{  
    let refreshToken = this.tokensService.getRefreshToken();

    if(this.isOnline && this.hasTokens())
         this.apiService.post('/Auth/logout', {refreshToken}).pipe(
             catchError(x => this.purgeAuth)).subscribe(x => this.purgeAuth()); 
    else this.purgeAuth();
  }

  populate(): void{
    if(this.hasTokens() && this.isOnline)
        this.apiService.get('/auth').subscribe(data => this.dataSubject.next(data));
  }
 
  hasAccessTokenExpired(): boolean{
    let tokenExpiration = this.tokensService.getAccessTokenExpiration();

    if(!tokenExpiration) return true;

    var now =  this.dateTimeService.getNowInUnixTimeSeconds();

    if (now >= tokenExpiration) return true;
  
    return false;
  }

  hasTokens(): boolean{
    let tokens = this.tokensService.getTokens();

    return !(
        this.isUndefinedOrNull(tokens) || 
        this.isUndefinedOrNull(tokens.accessToken) || 
        this.isUndefinedOrNull(tokens.refreshToken)
    );
  }

  getAccessToken = () => this.tokensService.getAccessToken();

  updateCurrentUser$(user: User): Observable<User> {
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å oppdatere profilen.')
    .pipe(take(1), tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService
    .put('/auth', user)
    .pipe(map(data => {
      data.role = this.dataSubject.value.role;
      this.dataSubject.next(data);
      return data;
    }));
  }

  changePassword$(oldPw: string, newPw: string){
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å endre passord.')
    .pipe(take(1), tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    const obj = {
      OldPassword: oldPw,
      NewPassword: newPw
    }
    return this.apiService
      .put('/auth/changePassword', obj);
  }

  purgeAuth(){
    this.dataSyncService.purgeAll(); //Clearing resources to prevent bugs if new user
    this.tokensService.destroyTokens();
    this.dataSubject.next({} as User);  // Set current user to an empty object  
  }

  private setAuth(tokenResponse: TokenResponse) {
    // Save tokens sent from server in localstorage
    let accessToken = tokenResponse.accessToken.token.replace("Bearer ", "");
    let accessTokenExpiration = this.dateTimeService.getNowInUnixTimeSeconds() + tokenResponse.accessToken.expiresIn;
    this.tokensService.saveTokens(accessToken, accessTokenExpiration, tokenResponse.refreshToken);

    // Set current user data into observable
    if(tokenResponse.user) this.dataSubject.next(tokenResponse.user);
  }

  private isUndefinedOrNull = (val: any) => val == undefined || val == null;

}
