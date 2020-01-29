import { Injectable } from '@angular/core';
import { Employer } from 'src/app/shared/models';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployersService {

  uri : String = "/Employers";

  private employersSubject =
          new BehaviorSubject<Employer[]>([]);

  private employers$ = this.employersSubject.asObservable();

  constructor(private apiService: ApiService) {}

  addEmployer(employer: Employer)
  {
    return this.apiService
                .post(`${this.uri}`, employer)
                .pipe(map(data =>{
                  this.addEmployerInSubject(data);
                }));
  }

  getEmployers(): Observable<Employer[]> {
    if(this.employersSubject.value === undefined || this.employersSubject.value.length == 0){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.employersSubject.next(data);
          return this.employers$;
        }));
    }
    else return this.employers$;
  }

  updateEmployer(employer: Employer)
  {
    return this.apiService.put(`${this.uri}/${employer.id}`, employer)
      .pipe(map(e => this.updateEmployerInSubject(e)));
  }

  deleteEmployer(id: number) {
    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(map(bool =>{
              if(bool)
                this.removeEmployerInSubject(id);
              return bool;
            }));
  }

  removeEmployerInSubject(id: number){
    this.employersSubject.next(
      this.employersSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  updateEmployerInSubject(employer: Employer){
    this.employersSubject.next(
      this.employersSubject.value.map(e => {
        if(e.id !== employer.id) return e;
        else return employer;
      })
    );
  }

  addEmployerInSubject(employer: Employer){
    if(!this.employersSubject.value.find(e => e.id == employer.id))
      this.employersSubject.value.push(employer);
  }

}
