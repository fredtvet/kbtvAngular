import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/core/models";
import { ApiUrl } from '../core/api-url.enum';
import { ObservableStore } from '../core/services/state/abstracts/observable-store';
import { ObservableStoreBase } from '../core/services/state/observable-store-base';
import { StateHttpCommandHandler } from "../core/services/state/state-http-command.handler";
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class ProfileStore extends ObservableStore<StoreState>  {

  currentUser$: Observable<User> = this.stateProperty$("currentUser");

  constructor(
    base: ObservableStoreBase,     
    private stateHttpCommandHandler: StateHttpCommandHandler,
  ) {
    super(base);
  }
  
  updateCurrentUser(user: User): void {
    this.stateHttpCommandHandler.dispatch({
      httpMethod: "PUT", 
      httpBody: user, 
      apiUrl: ApiUrl.Auth, 
      properties: ["currentUser"],
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
