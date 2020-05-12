import { Component } from '@angular/core';
import { IdentityService, NotificationService, MainNavService, AppConfigurationService, DataSyncService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { takeUntil, take, map, tap, filter, debounceTime } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends SubscriptionComponent {

  user: User;
  passwordStatus: string;

  syncRefreshTime$: Observable<number>;

  constructor(
    private dataSyncService: DataSyncService,
    private appConfigService: AppConfigurationService,
    private mainNavService: MainNavService,
    private identityService: IdentityService,
    private notificationService: NotificationService,
    private _dialog: MatDialog,
  ){ 
    super();     
    this.configureMainNav();
  }

  ngOnInit() {
    this.syncRefreshTime$ = this.appConfigService.config$.pipe(debounceTime(1000), map(x => x.syncRefreshTime / 60), tap(console.log));
    this.identityService.currentUser$.pipe(takeUntil(this.unsubscribe))
      .subscribe(user => this.user = user); 
  }

  updateProfile(updatedUser){
    updatedUser.userName = this.user.userName;

    this.identityService.updateCurrentUser(updatedUser).pipe(take(1))
      .subscribe(data => this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  updatePassword(data: any){
    this.identityService.changePassword(data.oldPassword, data.password).pipe(take(1))
    .subscribe(
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
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Profil";
    cfg.elevationEnabled = false;
    this.mainNavService.addConfig(cfg);
  }
}
