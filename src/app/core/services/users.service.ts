import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  uri : String;

  constructor(private http: HttpClient) {this.uri = environment.apiUrl + '/Users'}

  addUser(user: any)
  {
    return this
            .http
            .post(`${this.uri}`, user);
  }

  getUsers() {
       return this
        .http
        .get(`${this.uri}`);
  }

  getUser(username:string) {
    return this
     .http
     .get<User>(`${this.uri}/${username}`);
  }

  updateUser(user: any)
  {
    return this
            .http
            .put(`${this.uri}/${user.userName}`, user);
  }

  deleteUser(userName: string) {
    return this
            .http
            .delete(`${this.uri}/${userName}`);
  }

}
