import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url';
import { User } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from '../core/state';
import { Roles } from '../shared-app/enums';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class UsersStore extends BaseModelStore<StoreState>  {

  sortedUsers$: Observable<User[]>;

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});

    this.sortedUsers$ = this._propertyWithFetch$("users", this._fetchUsers$).pipe(map(this.sortByRole));
  }

  updatePassord$(userName: string, newPassword: string): Observable<boolean>{
    return this.apiService
      .put(`${ApiUrl.Users}/${userName}/NewPassword`, {newPassword, userName});
  }

  add$(user: User): Observable<void> {
    return this.apiService.post(ApiUrl.Users, user)
        .pipe(
          tap(x => this._updateStateProperty("users",
            (users: User[]) => this.arrayHelperService.add(users, x)))
        );  
  }

  update$(user: User): Observable<void> {
    return this.apiService.put(ApiUrl.MissionNote + '/' + user.userName, user)
        .pipe(
          tap(x => this._updateStateProperty("users",
            (users: User[]) => this.arrayHelperService.update(users, x, 'userName')))
        );   
  }

  delete$(userName: string): Observable<void> {
    return this.apiService.delete(ApiUrl.Users + '/' + userName)
        .pipe(
          tap(x => this._updateStateProperty("users",
            (users: User[]) => this.arrayHelperService.removeByIdentifier(users, x, 'userName')))
        );   
  }

  private get _fetchUsers$(): Observable<User[]> {
    return this.apiService.get(`${ApiUrl.Users}`);
  } 

  private sortByRole = (users: User[]): User[] => {
    if(this._isNullOrUndefined(users)) return [];

    let grouped = this.arrayHelperService.groupBy(users, "role");  
    return [...grouped[Roles.Leder], ...grouped[Roles.Mellomleder], ...grouped[Roles.Ansatt], ...grouped[Roles.Oppdragsgiver]];
  }
}
