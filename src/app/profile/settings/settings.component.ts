import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { filter} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DataSyncService, MainNavService, DataSyncConfig, SyncConfig } from 'src/app/core/services';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  syncConfig$ = this.dataSyncConfig.config$;

  constructor(
    private router: Router,
    private mainNavService: MainNavService,
    private dialog: MatDialog,
    private dataSyncService: DataSyncService,
    private dataSyncConfig: DataSyncConfig,
  ) { this.configureMainNav(); }

  confirmPurge = () => {
    let confirmString = 'Bekreft at du ønsker å slette lokal data. Alt vil bli lastet inn på nytt og dette krever mye data.'
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent,{data: confirmString});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.reloadAllData());
  }

  refresh = () => this.dataSyncService.syncAll();

  updateSyncConfig = (syncConfig: SyncConfig) => {
    let cfg = {...syncConfig};
    cfg.syncRefreshTime = cfg.syncRefreshTime * 60;
    this.dataSyncConfig.updateConfig(cfg);
  }

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
