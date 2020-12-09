import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@core/models';
import { SyncConfig } from '@sync/interfaces';
import { ConfirmDialogService } from 'src/app/modules/confirm-dialog/confirm-dialog.service';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { CurrentUserPasswordForm, CurrentUserPasswordFormState } from '@shared/constants/forms/password-form.const';
import { ProfileForm } from '@shared/constants/forms/profile-form.const';
import { SyncConfigForm } from '@shared/constants/forms/sync-config.form.const';
import { ProfileFacade } from '../profile.facade';
import { FormService } from '@form-sheet/form-sheet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  passwordStatus: string;

  navConfig: MainTopNavConfig = {title: "Profil"};

  constructor(
    private formService: FormService,
    private facade: ProfileFacade,
    private confirmService: ConfirmDialogService,
  ){}

  updateProfile(): void{
    this.formService.open<User, any>({
      formConfig: {...ProfileForm, initialValue: this.facade.currentUser}, 
      navConfig: {title: "Oppdater profil"},
      submitCallback: (val: User) => this.facade.updateCurrentUser(val)
    });
  }

  updatePassword(): void {
    this.formService.open<CurrentUserPasswordFormState, any>({
      formConfig: CurrentUserPasswordForm, 
      navConfig: {title: "Oppdater passord"},
      submitCallback: (val: CurrentUserPasswordFormState) => this.facade.updatePassword(val.oldPassword, val.newPassword)
    })
  }

  updateSyncConfig(): void {
    const config = this.facade.syncConfig;
    this.formService.open<SyncConfig, any>({
      formConfig: {...SyncConfigForm, initialValue: {...config, refreshTime: config.refreshTime / 60 }}, 
      navConfig: {title: "Konfigurasjoner"},
      submitCallback: (val: SyncConfig) => 
        this.facade.updateSyncConfig({...val, refreshTime: val.refreshTime * 60})
    })
  }

  confirmPurge = () => {
    this.confirmService.open({
      title: 'Slett lokalt data?',
      message: 'All data vil bli lastet ned på nytt. Vær varsom ved bruk av mobildata.', 
      confirmText: 'Slett',
      confirmCallback: this.facade.reloadData
    });
  }

  syncAll = () => this.facade.syncAll();

  logout = () => this.facade.logout();
}
