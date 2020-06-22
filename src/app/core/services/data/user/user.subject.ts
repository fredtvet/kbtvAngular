import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models';
import { EmployerSubject } from 'src/app/core/services/data/employer/employer.subject';
import { ArrayHelperService } from 'src/app/core/services/utility/array-helper.service';
import { BaseSubject } from '../abstracts/base.subject';

@Injectable({
  providedIn: 'root'
})

export class UserSubject extends BaseSubject<User>{

  constructor(
    arrayHelperService: ArrayHelperService,  
    private employerSubject: EmployerSubject,
    ) { 
      super('userName', arrayHelperService);
    }

  getAllDetails$ = ():Observable<User[]> => {
    return combineLatest(this.data$, this.employerSubject.getAll$()).pipe(
      map(([users, employers]) => {
        let employersObj = this.arrayHelperService.convertArrayToObject(employers, 'id');
        for(let i = 0; i < users.length; i++){
          users[i].employer = employersObj[users[i].employerId]
        }
        return users;
      })
    );
  }

}
