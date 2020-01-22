import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { Identity, User } from 'src/app/shared';


@Injectable()
export class IdentityService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  public isAuth: boolean = false;

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  populate(){
    if(this.jwtService.getToken()){
      this.apiService.get('/auth')
      .subscribe(
        data => this.setAuth(data),
        error => this.purgeAuth(),
      );
    }else
      this.purgeAuth();
  }

  setAuth(identity: Identity) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(identity.token.replace("Bearer ", ""));
    // Set current user data into observable
    this.currentUserSubject.next(identity.user);
    console.log(this.currentUserSubject.value);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    this.isAuth = true;
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.isAuth = false;
  }

  attemptAuth(type, credentials): Observable<Identity> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/auth' + route, credentials)
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
    if(!token) {
      return false;
    };

    let exp = token['exp'];

    if (Date.now() >= exp * 1000) {
        return false;
    }
    return true;
  }

  // Update the user on the server (email, pass, etc)
  updateCurrentUser(user): Observable<User> {
    return this.apiService
    .put('/auth', user )
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data);
      console.log(data);
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
