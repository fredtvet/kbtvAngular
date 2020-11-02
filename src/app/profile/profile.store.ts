import { Injectable } from "@angular/core";
import { User } from "src/app/core/models";
import { ObservableStore } from '../core/services/state/abstracts/observable-store';
import { CommandDispatcher } from '../core/services/state/command.dispatcher';
import { UpdateCurrentUserAction, UpdateCurrentUserStateCommand } from './state/update-current-user/update-current-user-state-command.interface';
import { UpdatePasswordAction, UpdatePasswordStateCommand } from './state/update-password/update-password-state-command.interface';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class ProfileStore extends ObservableStore<StoreState>  {

  get currentUser(): User{
    return this.getStateProperty("currentUser")
  };

  constructor(private commandDispatcher: CommandDispatcher) {
    super();
  }
  
  updateCurrentUser(user: User): void {
    this.commandDispatcher.dispatch<UpdateCurrentUserStateCommand>({
      user, action: UpdateCurrentUserAction
    });
  }

  updatePassword(oldPassword: string, newPassword: string){
    this.commandDispatcher.dispatch<UpdatePasswordStateCommand>({
      oldPassword, newPassword, action: UpdatePasswordAction
    });
  }

}
