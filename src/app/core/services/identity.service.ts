import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map, distinctUntilChanged, skip, tap, take } from 'rxjs/operators';
import { Identity, User } from 'src/app/shared/models';
import { LocalStorageService } from './local-storage.service';
import { ConnectionService } from './connection.service';
import { NotificationService } from './notification.service';
import { Notifications } from 'src/app/shared/enums';


@Injectable({
  providedIn: 'root'
})

export class IdentityService {
  private storageKey = "identity"

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  private isOnline: boolean = true;

  constructor (
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private jwtService: JwtService,
    private connectionService: ConnectionService,
    private notificationService: NotificationService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.localStorageService.get(this.storageKey) || new User());
    this.currentUser$ =  this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    this.currentUser$.pipe(skip(1)).subscribe(data => {
      this.localStorageService.add(this.storageKey, data); //Consider excluding username from localstorage
    });

    this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)

  }

  populate(){
    if(this.jwtService.getToken()){
      if(this.isOnline)
        this.apiService.get('/auth')
        .subscribe(data => this.currentUserSubject.next(data));
    }
    else this.purgeAuth();
  }

  setAuth(identity: Identity) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(identity.token.replace("Bearer ", ""));
    // Set current user data into observable
    this.currentUserSubject.next(identity.user);
  }

  purgeAuth() {
    window.localStorage.clear(); //Clearing entire storage on logout for now.
    //this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
  }

  attemptAuth(credentials): Observable<Identity> {
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å logge inn.')
    .pipe(take(1), tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService.post('/auth/login', credentials)
      .pipe(map(
      user => {
        this.setAuth(user);
        return user;
      }
    ));
  }

  getCurrentUser(): User{
    return this.currentUserSubject.value;
  }

  hasValidToken(){
    let token = this.jwtService.getDecodedToken();

    if(!token) return false;

    if (Date.now() >= token['exp'] * 1000) {
        return false;
    }
    return true;
  }

  updateCurrentUser(user: User): Observable<User> {
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å oppdatere profilen.')
    .pipe(take(1), tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService
    .put('/auth', user)
    .pipe(map(data => {
      data.role = this.currentUserSubject.value.role;
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  changePassword(oldPw: string, newPw: string){
    if(!this.isOnline) return throwError('Du må være tilkoblet internett for å endre passord.')
    .pipe(take(1), tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    const obj = {
      OldPassword: oldPw,
      NewPassword: newPw
    }
    return this.apiService
      .put('/auth/changePassword', obj);
  }

}
