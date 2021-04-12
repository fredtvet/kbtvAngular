import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/models';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { CurrentUserPasswordForm } from '@shared/constants/forms/password-form.const';
import { ProfileForm } from '@shared/constants/forms/profile-form.const';
import { ConfirmDialogService } from 'confirm-dialog';
import { FormService } from 'form-sheet';
import { ProfileFacade } from '../profile.facade';
import { ProfileAction } from './profile-action.interface';

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
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.actions = [
      {text: 'Oppdater profil', icon: 'account_circle', callback: this.updateProfile},
      {text: 'Oppdater passord', icon: 'vpn_key', callback: this.updatePassword},    
      {text: "Aktivitetslogg", icon: "rule", callback: this.goToRequestLog,
        hint: "Logg over aktiviteter utført denne økten."},
      {text: "Synkronisering", icon: 'update', callback: this.goToSyncProfile,
        hint: "Valg relatert til synkronisering av data"},      
      {text: 'Slett lokal data', icon: 'delete_sweep', callback: this.confirmClear,
        hint: "Du vil bli logget ut og må laste ned data på nytt ved neste økt."},  
      {text: 'Logg ut', icon: 'power_settings_new', callback: this.logout},   
    ]
  }

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

  private confirmClear = (): void => {
    this.confirmService.open({
      title: 'Slett lokal data?',
      message: 'Lokale innstillinger vil bli borte og all data må lastes ned på nytt. Vær varsom ved bruk av mobildata.', 
      confirmText: 'Slett',
      confirmCallback: () => this.facade.clearAndLogout()
    });
  }

  private goToRequestLog = () => this.router.navigate(['aktivitetslogg']);

  private logout = () => this.facade.logout(); 

  private goToSyncProfile = () => this.router.navigate(['synkronisering'],{relativeTo: this.route})
  
}
