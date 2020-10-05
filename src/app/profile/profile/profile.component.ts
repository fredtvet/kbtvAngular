import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStore } from 'src/app/core/services/auth';
import { FormService } from 'src/app/core/services/form/form.service';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

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
  ){}

  updateProfile = () => this.formService.open({formComponent: ProfileFormComponent, title: "Oppdater profil"});
  
  updatePassword = () => this.formService.open({formComponent: PasswordFormComponent, title: "Oppdater passord"});

  logout = () => this.authStore.logout();
}
