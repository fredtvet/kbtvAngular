import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Employer } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class EmployersService {

  uri : String;

  constructor(private http: HttpClient) {this.uri = environment.apiUrl + '/Employers'}

  addEmployer(employer: any)
  {
    return this
            .http
            .post(`${this.uri}`, employer);
  }

  getEmployers() {
       return this
        .http
        .get<Employer[]>(`${this.uri}`);
  }

  updateEmployer(employer: any)
  {
    return this
            .http
            .put(`${this.uri}/${employer.id}`, employer);
  }

  deleteEmployer(id) {
    return this
            .http
            .delete(`${this.uri}/${id}`);
  }
}
