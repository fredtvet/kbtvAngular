import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/core/models";
import { Roles } from '../shared-app/enums';
import { _groupBy } from '../shared-app/helpers/array/group-by.helper';
import { Store } from '../state/store';
import { StoreState } from './store-state';
import { UpdateUserPasswordActionId, UpdateUserPasswordCommand } from './update-user-password.http.effect';

@Injectable({providedIn: 'any'})
export class UsersFacade {

  sortedUsers$: Observable<User[]> = 
    this.store.selectProperty$<User[]>("users").pipe(map(x => this.sortByRole(x)));
  
  get users(): User[]{ return this.store.selectProperty("users"); }

  constructor(private store: Store<StoreState>) { }

  updatePassword(userName: string, newPassword: string): void{
    this.store.dispatch(<UpdateUserPasswordCommand>{
      actionId: UpdateUserPasswordActionId, userName, newPassword
    })
  }
  
  private sortByRole = (users: User[]): User[] => {
    if(!users) return [];

    let grouped = _groupBy(users, "role"); 
    let result = [];

    for(let role of Object.keys(Roles).map(key => Roles[key])) 
      if(grouped[role]) result = result.concat(grouped[role])

    return result;
  }
}
