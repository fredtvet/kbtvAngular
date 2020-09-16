import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { ApiUrl } from '../core/api-url.enum';
import { StateHttpCommandHandler } from '../core/services/state-http-command.handler';
import { BaseStore } from '../core/state/abstracts/base.store';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class ProfileStore extends BaseStore<StoreState>  {

  currentUser$: Observable<User> = this.property$("currentUser");

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,        
    private stateHttpCommandHandler: StateHttpCommandHandler<StoreState>,
  ) {
    super(arrayHelperService, apiService);
  }
  
  updateCurrentUser(user: User): void {
    this.stateHttpCommandHandler.dispatch({
      httpMethod: "PUT", 
      httpBody: user, 
      apiUrl: ApiUrl.Auth, 
      stateFunc: (s: StoreState) => { return {currentUser: {...s.currentUser, ...user}} },
      cancelMessage: "Oppdatering av profil er reversert"
    });
  }

  updatePassword(oldPw: string, newPw: string){
    this.stateHttpCommandHandler.dispatch({
      httpMethod: "PUT", 
      httpBody: {OldPassword: oldPw, NewPassword: newPw}, 
      apiUrl: `${ApiUrl.Auth}/changePassword`
    });
  }

}
