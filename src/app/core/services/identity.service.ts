import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map ,  distinctUntilChanged, skip } from 'rxjs/operators';
import { Identity, User } from 'src/app/shared/models';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})

export class IdentityService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;
  private storageKey = "identity"
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  public isAuth: boolean = false;

  constructor (
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private jwtService: JwtService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.localStorageService.get(this.storageKey) || new User());
    this.currentUser$ =  this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    this.currentUser$.pipe(skip(1)).subscribe(data => {
      this.localStorageService.add(this.storageKey, data); //Consider excluding username from localstorage
    });
  }

  populate(){
    if(this.jwtService.getToken()){
      this.apiService.get('/auth')
      .subscribe(data => this.setAuth(data));
    }
    else this.purgeAuth();
  }

  setAuth(identity: Identity) {
    console.log('auth')
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(identity.token.replace("Bearer ", ""));
    // Set current user data into observable
    this.currentUserSubject.next(identity.user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    this.isAuth = true;
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.isAuth = false;
  }

  attemptAuth(credentials): Observable<Identity> {
    return this.apiService.post('/auth/login', credentials)
      .pipe(map(
      user => {
        console.log(user);
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
    return this.apiService
    .put('/auth', user)
    .pipe(map(data => {
      data.role = this.currentUserSubject.value.role;
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  changePassword(oldPw: string, newPw: string){
    const obj = {
      OldPassword: oldPw,
      NewPassword: newPw
    }
    return this.apiService
      .put('/auth/changePassword', obj);
  }

}
