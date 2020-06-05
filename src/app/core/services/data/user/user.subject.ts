import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/models';

@Injectable({
  providedIn: 'root'
})

export class UserSubject {

  private usersSubject = new BehaviorSubject<User[]>([]);
  
  public users$ = this.usersSubject.asObservable();

  constructor() { }

  populate(users: User[]) {
    this.usersSubject.next(users);
  }

  get$(userName: string): Observable<User> {
    return this.users$.pipe(map(arr => { return {...arr.find(e => e.userName == userName)}}));
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
