import { Injectable } from '@angular/core';
import { Employer } from 'src/app/shared/models';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EmployersSubject } from '../subjects/employers.subject';

@Injectable({
  providedIn: 'root'
})

export class EmployersService {

  uri : String = "/Employers";

  constructor(
    private apiService: ApiService,
    private employersSubject: EmployersSubject) {}

  getAll$(): Observable<Employer[]> {
    if(this.employersSubject.isEmpty()){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.employersSubject.populate(data);
          return this.employersSubject.employers$;
        }));
    }
    else return this.employersSubject.employers$;
  }

  get$(id: number):Observable<Employer>{
    return this.employersSubject.get$(id);
  }

  add$(employer: Employer): Observable<Employer>
  {
    return this.apiService
                .post(`${this.uri}`, employer)
                .pipe(map(data =>{
                  this.employersSubject.add(data);
                  return data;
                }));
  }

  update$(employer: Employer): Observable<Employer>
  {
    return this.apiService.put(`${this.uri}/${employer.id}`, employer)
      .pipe(map(data => {
        this.employersSubject.update(data);
        return data;
      }));
  }

  delete$(id: number): Observable<boolean> {
    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(map(bool =>{
              if(bool)
                this.employersSubject.delete(id);
              return bool;
            }));
  }

}
