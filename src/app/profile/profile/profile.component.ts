import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStore } from 'src/app/core/services/auth';
import { FormService } from 'src/app/core/services/form/form.service';
import { MainNavService } from 'src/app/layout';
import { MainTopNavComponent } from 'src/app/shared/components';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav/main-top-nav-config.interface';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  passwordStatus: string;


  constructor(
    private mainNavService: MainNavService,
    private formService: FormService,
    private authStore: AuthStore,
  ){    
    this.configureMainNav();
  }

  updateProfile = () => this.formService.open({formComponent: ProfileFormComponent, title: "Oppdater profil"});
  
  updatePassword = () => this.formService.open({formComponent: PasswordFormComponent, title: "Oppdater passord"});

  logout = () => this.authStore.logout();

  private configureMainNav(){
    this.mainNavService.addConfig<MainTopNavConfig>({
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {title:  "Profil"}
    });
  }
}
