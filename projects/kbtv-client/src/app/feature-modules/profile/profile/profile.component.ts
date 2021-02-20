import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@core/models';
import { SyncConfig } from 'state-sync';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { ProfileForm } from '@shared/constants/forms/profile-form.const';
import { SyncConfigForm } from '@shared/constants/forms/sync-config.form.const';
import { ProfileFacade } from '../profile.facade';
import { FormService } from 'form-sheet';
import { CurrentUserPasswordForm } from '@shared/constants/forms/password-form.const';
import { ConfirmDialogService } from 'confirm-dialog';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { ProfileAction } from './profile-action.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  
  navConfig: MainTopNavConfig = {title: "Profil"};

  bottomActions: AppButton[];

  actions: ProfileAction[];
  
  constructor(
    private formService: FormService,
    private facade: ProfileFacade,
    private confirmService: ConfirmDialogService,
    private router: Router
  ){
    this.bottomActions = [{icon: 'update', callback: this.syncAll}]
    this.actions = [
      {text: 'Oppdater profil', icon: 'account_circle', callback: this.updateProfile},
      {text: 'Oppdater passord', icon: 'vpn_key', callback: this.updatePassword},
      {text: 'Konfigurasjoner', icon: 'settings', callback: this.updateSyncConfig},     
      {text: "Aktivitetslogg", icon: "rule", callback: this.goToRequestLog},
      {text: 'Synkroniser data', icon: 'update', callback: this.syncAll, 
        hint: 'Hent nye og oppdaterte data fra skyen.'},
      {text: 'Slett lokal data', icon: 'delete_sweep',callback: this.confirmPurge,
        hint: 'Slett data lagret på enheten og last inn på nytt.'},
      {text: 'Logg ut', icon: 'power_settings_new', callback: this.logout},  
    ]
  }

  handleFn = (fn: Function, parameters: unknown[] = []) => fn(...parameters);

  private updateProfile= (): void => {
    this.formService.open<User>({
      formConfig: {...ProfileForm, initialValue: this.facade.currentUser}, 
      navConfig: {title: "Oppdater profil"},
      submitCallback: (val: User) => this.facade.updateCurrentUser(val)
    });
  }

  private updatePassword = (): void => {
    this.formService.open<CurrentUserPasswordForm>({
      formConfig: CurrentUserPasswordForm, 
      navConfig: {title: "Oppdater passord"},
      submitCallback: (val: CurrentUserPasswordForm) => this.facade.updatePassword(val.oldPassword, val.newPassword)
    })
  }

  private updateSyncConfig = (): void => {
    const config = this.facade.syncConfig;
    this.formService.open<SyncConfig, unknown>({
      formConfig: {...SyncConfigForm, initialValue: config ? {...config, refreshTime: config.refreshTime / 60 } : null}, 
      navConfig: {title: "Konfigurasjoner"},
      submitCallback: (val: SyncConfig) => 
        this.facade.updateSyncConfig({...val, refreshTime: val.refreshTime * 60})
    })
  }

  private confirmPurge = () => {
    this.confirmService.open({
      title: 'Slett lokalt data?',
      message: 'All data vil bli lastet ned på nytt. Vær varsom ved bruk av mobildata.', 
      confirmText: 'Slett',
      confirmCallback: this.facade.reloadData
    });
  }

  private goToRequestLog = () => this.router.navigate(['aktivitetslogg']);

  private syncAll = () => this.facade.syncAll();

  private logout = () => this.facade.logout(); 

}
