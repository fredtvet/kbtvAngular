import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/models';
import { EmployerSubject } from 'src/app/core/services/data/employer/employer.subject';
import { ArrayHelperService } from 'src/app/core/services/utility/array-helper.service';

@Injectable({
  providedIn: 'root'
})

export class UserSubject {

  private usersSubject = new BehaviorSubject<User[]>([]);
  
  public users$ = this.usersSubject.asObservable();

  constructor(
    private employerSubject: EmployerSubject,
    private arrayHelperService: ArrayHelperService,
    ) { }

  populate(users: User[]) {
    this.usersSubject.next(users);
  }

  get$(userName: string): Observable<User> {
    return this.users$.pipe(map(arr => { return {...arr.find(e => e.userName == userName)}}));
  }

  getAllDetails$ = ():Observable<User[]> => {
    return combineLatest(this.users$, this.employerSubject.getAll$()).pipe(
      map(([users, employers]) => {
        let employersObj = this.arrayHelperService.convertArrayToObject(employers, 'id');
        for(let i = 0; i < users.length; i++){
          users[i].employer = employersObj[users[i].employerId]
        }
        return users;
      })
    );
  }

  addOrUpdate(user: User): void{
    if(this.usersSubject.value && !this.usersSubject.value.find(e => e.userName == user.userName)) {
      const arr = [user, ...this.usersSubject.value]
      this.usersSubject.next(arr);
    }
    else this.update(user);
  }

  update(user: User): void{
    let arr = [...this.usersSubject.value];
    arr = arr.map(e => {
      if(e.userName !== user.userName) return e;
      else return {...Object.assign(e, user)};
    });
    this.usersSubject.next(arr);
  }

  delete(userName: string) {
    this.usersSubject.next(this.usersSubject.value.filter(d => {
      return d.userName !== userName;
    }));
  }

  get isEmpty(): boolean {
    return (!this.usersSubject.value || this.usersSubject.value.length == 0);
  }
}
