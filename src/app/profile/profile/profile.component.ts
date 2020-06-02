import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, NotificationService, MainNavService, AppConfigurationService, DataSyncService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { map, filter, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { TopDefaultNavConfig } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  passwordStatus: string;

  user$: Observable<User> =  this.authService.currentUser$;

  syncRefreshTime$: Observable<number> = 
    this.appConfigService.config$.pipe(debounceTime(1000), map(x => x.syncRefreshTime / 60));

  constructor(
    private dataSyncService: DataSyncService,
    private appConfigService: AppConfigurationService,
    private mainNavService: MainNavService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private _dialog: MatDialog,
  ){    
    this.configureMainNav();
  }

  updateProfile = (user: User) =>
    this.authService.updateCurrentUser$(user).subscribe(data => 
      this.notificationService.setNotification('Vellykket oppdatering!'));
  

  updatePassword(data: any){
    this.authService.changePassword$(data.oldPassword, data.password).subscribe(
      data => this.notificationService.setNotification('Passord oppdatert!'),
      error => this.passwordStatus = "Nåværende passord stemmer ikke",
      () => this.passwordStatus = ""
    );
  }

  confirmPurge = () => {
    let confirmString = 'Bekreft at du ønsker å slette lokal data. Alt vil bli lastet inn på nytt og dette krever mye data.'
    const deleteDialogRef = this._dialog.open(ConfirmDialogComponent,{data: confirmString});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.reloadAllData());
  }

  updateSyncRefreshTime(minutes: number){
    if(isNaN(minutes)) minutes = 30;
    this.appConfigService.setSyncRefreshTime(minutes * 60);
  }

  private reloadAllData(){
    this.dataSyncService.purgeAll();
    this.dataSyncService.syncAll();
  }

  private configureMainNav(){
    let cfg = {
      title:  "Profil",
      elevationDisabled: false
    } as TopDefaultNavConfig;
    
    this.mainNavService.addTopNavConfig({default: cfg});
  }
}
