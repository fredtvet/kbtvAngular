import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthStore, MainNavService } from 'src/app/core/services';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { PasswordFormWrapperComponent } from '../password-form/password-form-wrapper.component';
import { ProfileFormWrapperComponent } from '../profile-form/profile-form-wrapper.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  passwordStatus: string;


  constructor(
    private mainNavService: MainNavService,
    private bottomSheet: MatBottomSheet,
    private authStore: AuthStore,
  ){    
    this.configureMainNav();
  }

  updateProfile = () => this.bottomSheet.open(ProfileFormWrapperComponent);
  
  updatePassword = () => this.bottomSheet.open(PasswordFormWrapperComponent);

  logout = () => this.authStore.logout();

  private configureMainNav(){
    let cfg = {
      title:  "Profil",
      elevationDisabled: false
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }
}
