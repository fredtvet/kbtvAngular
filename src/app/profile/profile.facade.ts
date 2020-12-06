import { Injectable } from "@angular/core";
import { User } from "src/app/core/models";
import { AuthService } from '../core/services/auth';
import { SyncConfig } from '../core/services/sync/interfaces';
import { ReloadSyncStateActionId, SyncStateActionId, UpdateSyncConfigActionId, UpdateSyncConfigCommand } from '../core/services/sync/state/actions.const';
import { Store } from '../state/store';
import { UpdateCurrentUserActionId, UpdateCurrentUserStateCommand } from './state/update-current-user/update-current-user-state-command.interface';
import { UpdatePasswordActionId, UpdatePasswordStateCommand } from './state/update-password/update-password-state-command.interface';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class ProfileFacade {

  get currentUser(): User{
    return this.store.selectProperty<User>("currentUser")
  };

  get syncConfig(): SyncConfig{
    return this.store.selectProperty<SyncConfig>("syncConfig")
  };

  constructor(
    private store: Store<StoreState>,
    private authService: AuthService
  ) {}
  
  updateCurrentUser = (user: User): void => 
    this.store.dispatch<UpdateCurrentUserStateCommand>({
      actionId: UpdateCurrentUserActionId, user
    });
  
  updatePassword = (oldPassword: string, newPassword: string) => 
    this.store.dispatch<UpdatePasswordStateCommand>({
      actionId: UpdatePasswordActionId, oldPassword, newPassword
    });
  
  updateSyncConfig = (syncConfig: SyncConfig) => 
    this.store.dispatch<UpdateSyncConfigCommand>({
      actionId: UpdateSyncConfigActionId, syncConfig, propagate: true
    });
  
  syncAll = () => this.store.dispatch({actionId: SyncStateActionId, propagate: true});

  reloadData = () => this.store.dispatch({actionId: ReloadSyncStateActionId, propagate: true});

  logout = () => this.authService.logout(); 

}
