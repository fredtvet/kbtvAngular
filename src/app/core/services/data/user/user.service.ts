import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { map, switchMap } from 'rxjs/operators';
import { UserSubject } from './user.subject';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  uri : String = "/Users";

  constructor(
    private apiService: ApiService,
    private userSubject: UserSubject) {}

  getAll$(): Observable<User[]> {
    if(this.userSubject.isEmpty){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.userSubject.populate(data);
          return this.userSubject.users$;
        }));
    }
    else return this.userSubject.users$;
  }

  getByRole$(role: string): Observable<User[]>{
    return this.getAll$().pipe(map(arr => arr.filter(u => u.role == role)));
  }

  get$(userName: string):Observable<User>{
    return this.userSubject.get$(userName);
  }

  add$(user: User): Observable<User>
  {
    return this.apiService
      .post(`${this.uri}`, user)
      .pipe(map(data => {
        this.userSubject.addOrUpdate(data);
        return data;
      }));
  }

  update$(user: User): Observable<User>
  {
    return this.apiService
      .put(`${this.uri}/${user.userName}`, user)
      .pipe(map(data => {
        this.userSubject.update(data);
        return data;
      }));
  }

  delete$(userName: string): Observable<boolean> {
    return this
      .apiService
      .delete(`${this.uri}/${userName}`)
      .pipe(map(bool =>{ console.log(bool);
        if(bool) this.userSubject.delete(userName);
        return bool;
      }));
  }

}
