import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserSubject } from './user.subject';
import { User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  uri : String = "/Users";

  constructor(
    private apiService: ApiService,
    private userSubject: UserSubject) {}

  getAll$(): Observable<User[]> {
    if(this.userSubject.isEmpty) return this.populate<User[]>(this.userSubject.users$);
    else return this.userSubject.users$;
  }

  getAllDetails$(): Observable<User[]>{
    if(this.userSubject.isEmpty) return this.populate<User[]>(this.userSubject.getAllDetails$());
    else return this.userSubject.getAllDetails$();

  }

  getByRole$(role: string): Observable<User[]>{
    return this.getAll$().pipe(map(arr => arr.filter(u => u.role == role)));
  }

  get$(userName: string):Observable<User>{
    if(this.userSubject.isEmpty) return this.populate<User>(this.userSubject.get$(userName));
    else return this.userSubject.get$(userName);
  }

  add$(user: User): Observable<User>
  {
    return this.apiService
      .post(`${this.uri}`, user)
      .pipe(tap(data => this.userSubject.addOrUpdate(data)));
  }

  update$(user: User): Observable<User>
  {
    return this.apiService
      .put(`${this.uri}/${user.userName}`, user)
      .pipe(tap(data => this.userSubject.update(data)));
  }

  delete$(userName: string): Observable<boolean> {
    return this
      .apiService
      .delete(`${this.uri}/${userName}`)
      .pipe(tap(bool =>{if(bool) this.userSubject.delete(userName)}));
  }

  private populate<T>(returnObservable: Observable<T>): Observable<T>{
    return this.apiService.get(`${this.uri}`)
    .pipe(switchMap(data => {
      this.userSubject.populate(data);
      return returnObservable
    }));
  }
  
}
