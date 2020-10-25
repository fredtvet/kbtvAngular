import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'src/app/core/models';
import { AuthStore } from 'src/app/core/services/auth';
import { FormService } from 'src/app/core/services/form/form.service';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { CurrentUserPasswordForm, CurrentUserPasswordFormState } from 'src/app/shared/forms/password-form.const';
import { ProfileForm } from 'src/app/shared/forms/profile-form.const';
import { ProfileStore } from '../profile.store';

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
    private authStore: AuthStore,
    private store: ProfileStore,
  ){}

  updateProfile = () => 
    this.formService.open<User, any>({
      formConfig: {...ProfileForm, initialValue: this.store.currentUser}, 
      navConfig: {title: "Oppdater profil"},
      submitCallback: (val: User) => this.store.updateCurrentUser(val)
    });

  updatePassword = () => 
    this.formService.open<CurrentUserPasswordFormState, any>({
      formConfig: CurrentUserPasswordForm, 
      navConfig: {title: "Oppdater passord"},
      submitCallback: (val: CurrentUserPasswordFormState) => this.store.updatePassword(val.oldPassword, val.newPassword)
    })

  logout = () => this.authStore.logout();
}
