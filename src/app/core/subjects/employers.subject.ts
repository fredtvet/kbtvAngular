import { Injectable } from '@angular/core';
import { Employer  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployersSubject {

  private employersSubject =
          new BehaviorSubject<Employer[]>([]);

  public employers$ = this.employersSubject.asObservable();

  constructor() {}

  populate(employers: Employer[]){
    this.employersSubject.next(employers);
  }

  get$(id: number): Observable<Employer>{
    return this.employers$.pipe(map(arr => arr.find(e => e.id == id)));
  }

  add(employer: Employer){
    if(!this.employersSubject.value.find(e => e.id == employer.id)) //Only add if ID doesnt exist
      this.employersSubject.value.push(employer);
  }

  update(employer: Employer){
    this.employersSubject.next(
      this.employersSubject.value.map(e => {
        if(e.id !== employer.id) return e;
        else return employer;
      })
    );
  }

  delete(id: number){
    this.employersSubject.next(
      this.employersSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  isEmpty(): boolean{
    return (this.employersSubject.value === undefined || this.employersSubject.value.length == 0)
  }

}
