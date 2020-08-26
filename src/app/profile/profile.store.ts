import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from '../core/state';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class ProfileStore extends BaseModelStore<StoreState>  {

  currentUser$: Observable<User> = this.property$("currentUser");

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }
  
  updateCurrentUser$(user: User): Observable<User> {
    return this.apiService.put('/auth', user)
      .pipe(tap(updatedUser => this._setStateVoid({currentUser: updatedUser}, StoreActions.UpdateCurrentUser)));
  }

  updatePassword$(oldPw: string, newPw: string){
    const obj = {OldPassword: oldPw, NewPassword: newPw}
    return this.apiService.put('/auth/changePassword', obj);
  }

}

export enum StoreActions {
  UpdateCurrentUser = "update_currentUser",
  UpdateSyncConfig = "update_syncConfig"
}
