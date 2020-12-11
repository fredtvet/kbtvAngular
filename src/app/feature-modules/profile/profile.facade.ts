import { Injectable } from "@angular/core";
import { User } from "@core/models";
import { AuthService } from '@core/services/auth';
import { SyncConfig } from '@sync/interfaces';
import { Store } from '@state/store';
import { StoreState } from './store-state';
import { UpdateSyncConfigAction, SyncStateAction, ReloadSyncStateAction } from '@sync/state/actions';
import { UpdateCurrentUserAction } from './state/update-current-user/update-current-user.action';
import { UpdatePasswordAction } from './state/update-password/update-password.action';

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
    this.store.dispatch(new UpdateCurrentUserAction(user));
  
  updatePassword = (oldPassword: string, newPassword: string) => 
    this.store.dispatch(new UpdatePasswordAction(oldPassword, newPassword));
  
  updateSyncConfig = (syncConfig: SyncConfig) => 
    this.store.dispatch(new UpdateSyncConfigAction(syncConfig));
  
  syncAll = () => this.store.dispatch(new SyncStateAction());

  reloadData = () => this.store.dispatch(new ReloadSyncStateAction());

  logout = () => this.authService.logout(); 

}
