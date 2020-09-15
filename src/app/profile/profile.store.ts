import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { ApiUrl } from '../core/api-url.enum';
import { StoreState } from './store-state';
import { BaseCommandStore } from '../core/state/abstracts/base-command.store';

@Injectable({
  providedIn: 'any',
})
export class ProfileStore extends BaseCommandStore<StoreState>  {

  currentUser$: Observable<User> = this.property$("currentUser");

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService);
  }
  
  updateCurrentUser(user: User): void {
    this._stateHttpCommandHandler({
      httpMethod: "PUT", 
      httpBody: user, 
      apiUrl: ApiUrl.Auth, 
      stateFunc: (s: StoreState) => { return {currentUser: {...s.currentUser, ...user}} }
    });
  }

  updatePassword(oldPw: string, newPw: string){
    this._stateHttpCommandHandler({
      httpMethod: "PUT", 
      httpBody: {OldPassword: oldPw, NewPassword: newPw}, 
      apiUrl: `${ApiUrl.Auth}/changePassword`
    });
  }

}
