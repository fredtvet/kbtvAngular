import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { map, switchMap } from 'rxjs/operators';
import { UsersSubject } from '../../subjects/users.subject';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  uri : String = "/Users";

  constructor(
    private apiService: ApiService,
    private usersSubject: UsersSubject) {}

  getAll$(): Observable<User[]> {
    if(this.usersSubject.isEmpty()){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.usersSubject.populate(data);
          return this.usersSubject.users$;
        }));
    }
    else return this.usersSubject.users$;
  }

  getByRole$(role: string): Observable<User[]>{
    return this.getAll$().pipe(map(arr => arr.filter(u => u.role == role)));
  }

  get$(userName: string):Observable<User>{
    return this.usersSubject.get$(userName);
  }

  add$(user: User): Observable<User>
  {
    return this.apiService
      .post(`${this.uri}`, user)
      .pipe(map(data => {
        this.usersSubject.addOrUpdate(data);
        return data;
      }));
  }

  update$(user: User): Observable<User>
  {
    return this.apiService
      .put(`${this.uri}/${user.userName}`, user)
      .pipe(map(data => {
        this.usersSubject.update(data);
        return data;
      }));
  }

  delete$(userName: string): Observable<boolean> {
    return this
      .apiService
      .delete(`${this.uri}/${userName}`)
      .pipe(map(bool =>{
        if(bool) this.usersSubject.delete(userName);
        return bool;
      }));
  }

}
