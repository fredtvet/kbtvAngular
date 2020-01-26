import { Injectable } from '@angular/core';
import { Employer } from 'src/app/shared/models';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      this.apiService.get(`${this.uri}`)
      .subscribe(data => {
        this.employersSubject.next(data);
      });
    }
    return this.employers$;
  }

  updateEmployer(employer: Employer)
  {
    return this.apiService.put(`${this.uri}/${employer.id}`, employer)
      .pipe(map(e => this.updateEmployersSubject(e)));
  }

  deleteEmployer(id: number) {
    return this
            .apiService
            .delete(`${this.uri}/${id}`);
  }

  updateEmployersSubject(employer: Employer){
    this.employersSubject.next(
      this.employersSubject.value.map(e => {
        if(e.id !== employer.id) return e;
        else return employer;
      })
    );
  }

  addEmployerInSubject(employer: Employer){
    this.employersSubject.value.push(employer);
  }

  addOrUpdateInSubject(employer: Employer){
    if(this.employersSubject.value.find(e => e.id == employer.id))
      this.updateEmployersSubject(employer);
    else
      this.addEmployerInSubject(employer);
  }

}
