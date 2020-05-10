import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models';

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
    return this.users$.pipe(map(arr => arr.find(e => e.userName == userName)));
  }

  addOrUpdate(user: User) {
    if (!this.usersSubject.value.find(e => e.userName == user.userName)) //Only add if user doesnt exist
      this.usersSubject.value.push(user);
    else this.update(user);
  }

  update(user: User) {
    this.usersSubject.next(this.usersSubject.value.map(e => {
      if (e.userName !== user.userName)
        return e;
      else
        return user;
    }));
  }

  delete(userName: string) {
    this.usersSubject.next(this.usersSubject.value.filter(d => {
      return d.userName !== userName;
    }));
  }

  get isEmpty(): boolean {
    return (this.usersSubject.value === undefined || this.usersSubject.value.length == 0);
  }
}
