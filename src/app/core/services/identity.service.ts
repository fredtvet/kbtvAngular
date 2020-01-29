import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { Identity, User } from 'src/app/shared/models';


@Injectable({
  providedIn: 'root'
})

export class IdentityService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser$ = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  public isAuth: boolean = false;

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {
    this.initalizeUserFromToken();
  }

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

  private initalizeUserFromToken(){
    let token = this.jwtService.getDecodedToken();
    if(!token) return null;
    let user = new User();
    user.role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    this.currentUserSubject.next(user);
  }

}
