import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainNavService } from 'src/app/core/services';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProfileFormWrapperComponent } from '../profile-form/profile-form-wrapper.component';
import { PasswordFormWrapperComponent } from '../password-form/password-form-wrapper.component';

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
  ){    
    this.configureMainNav();
  }

  updateProfile = () => this.bottomSheet.open(ProfileFormWrapperComponent);
  
  updatePassword = () => this.bottomSheet.open(PasswordFormWrapperComponent);


  private configureMainNav(){
    let cfg = {
      title:  "Profil",
      elevationDisabled: false
    } as TopDefaultNavConfig;
    
    this.mainNavService.addTopNavConfig({default: cfg});
  }
}
