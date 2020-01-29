import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  uri : String = "/Users";

  private usersSubject =
          new BehaviorSubject<User[]>([]);

  private users$ = this.usersSubject.asObservable();

  constructor(private apiService: ApiService) {}

  addUser(user: User)
  {
    return this.apiService
                .post(`${this.uri}`, user)
                .pipe(map(data =>{
                  console.log(data);
                  this.addUserInSubject(data);
                }));
  }

  getUsers(): Observable<User[]> {
    if(this.usersSubject.value === undefined || this.usersSubject.value.length == 0){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.usersSubject.next(data);
          return this.users$;
        }));
    }
    else return this.users$;
  }

  updateUser(user: User)
  {
    return this.apiService.put(`${this.uri}/${user.userName}`, user)
      .pipe(map(e => this.updateUserInSubject(e)));
  }

  deleteUser(userName: string) {
    return this
            .apiService
            .delete(`${this.uri}/${userName}`)
            .pipe(map(bool =>{
              if(bool)
                this.removeUserInSubject(userName);
              return bool;
            }));
  }

  removeUserInSubject(userName: string){
    this.usersSubject.next(
      this.usersSubject.value.filter(d => {
        return d.userName !== userName
      })
    );
  }

  updateUserInSubject(user: User){
    this.usersSubject.next(
      this.usersSubject.value.map(e => {
        if(e.userName !== user.userName) return e;
        else return user;
      })
    );
  }

  addUserInSubject(user: User){
    if(!this.usersSubject.value.find(e => e.userName == user.userName))
      this.usersSubject.value.push(user);
  }

}
