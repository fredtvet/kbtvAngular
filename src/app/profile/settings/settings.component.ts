import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { filter, debounceTime, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DataSyncService, AppConfigurationService, MainNavService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  syncRefreshTime$: Observable<number> = 
    this.appConfigService.config$.pipe(map(x => x.syncRefreshTime / 60));
    
  constructor(
    private router: Router,
    private mainNavService: MainNavService,
    private dialog: MatDialog,
    private dataSyncService: DataSyncService,
    private appConfigService: AppConfigurationService,
  ) { this.configureMainNav(); }

  confirmPurge = () => {
    let confirmString = 'Bekreft at du ønsker å slette lokal data. Alt vil bli lastet inn på nytt og dette krever mye data.'
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent,{data: confirmString});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.reloadAllData());
  }

  updateSyncRefreshTime(minutes: number){
    if(isNaN(minutes)) minutes = 30;
    this.appConfigService.setSyncRefreshTime(minutes * 60);
  }

  refresh = () => this.dataSyncService.syncAll();

  private reloadAllData(){
    this.dataSyncService.purgeAll();
    this.dataSyncService.syncAll();
  }  

  private configureMainNav(){
    let cfg = {
      title:  "Innstillinger",
      backFn: this.onBack,
      elevationDisabled: false
    } as TopDefaultNavConfig;
    
    this.mainNavService.addTopNavConfig({default: cfg});
  }

  private onBack = () => this.router.navigate(['profil']);
}
