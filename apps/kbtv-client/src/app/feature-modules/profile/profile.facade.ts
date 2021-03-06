import { Injectable } from "@angular/core";
import { Immutable } from "global-types";
import { AuthService } from "state-auth";
import { Store } from 'state-management';
import { ReloadSyncStateAction, SyncConfig, SyncStateAction, UpdateSyncConfigAction } from 'state-sync';
import { ProfileForm } from "./forms/profile-form.const";
import { UpdateCurrentUserAction, UpdatePasswordAction, ClearAndLogoutAction } from "./state/actions.const";
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class ProfileFacade {

  get currentUser() {
    return this.store.state.currentUser
  };

  get syncConfig() {
    return this.store.state.syncConfig
  };

  constructor(
    private store: Store<StoreState>,
    private authService: AuthService
  ) {}
  
  updateCurrentUser = (user: Immutable<ProfileForm>): void => 
    this.store.dispatch<UpdateCurrentUserAction>({ type: UpdateCurrentUserAction, user });
  
  updatePassword = (oldPassword: string, newPassword: string) => 
    this.store.dispatch<UpdatePasswordAction>({ type: UpdatePasswordAction, oldPassword, newPassword });
  
  updateSyncConfig = (syncConfig: Immutable<SyncConfig>) => 
    this.store.dispatch<UpdateSyncConfigAction>({ type: UpdateSyncConfigAction, syncConfig });
  
  syncAll = () => this.store.dispatch<SyncStateAction>({ type: SyncStateAction });

  reloadData = () => this.store.dispatch<ReloadSyncStateAction>({ type: ReloadSyncStateAction });

  logout = () => this.authService.logout(); 

  clearAndLogout = () => {
    this.store.dispatch({type: ClearAndLogoutAction})
  }

}
