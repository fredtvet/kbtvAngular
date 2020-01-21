import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  uri : String;

  constructor(private http: HttpClient) {this.uri = environment.apiUrl + '/Roles'}

  getRoles() {
       return this
        .http
        .get<string[]>(`${this.uri}`);
  }

}
