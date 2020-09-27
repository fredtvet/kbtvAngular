import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SyncStore, SyncStoreConfig } from 'src/app/core/services/sync';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { MainNavService } from 'src/app/layout';
import { MainTopNavComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  syncConfig$ = this.syncStore.syncConfig$;

  constructor(
    private router: Router,
    private mainNavService: MainNavService,
    private confirmService: ConfirmDialogService,
    private syncStore: SyncStore
  ) { this.configureMainNav(); }

  confirmPurge = () => {
    this.confirmService.open({
      title: 'Slett lokalt data?',
      message: 'All data vil bli lastet ned på nytt. Vær varsom ved bruk av mobildata.', 
      confirmText: 'Slett',
      confirmCallback: this.reloadAllData
    });
  }

  refresh = () => this.syncStore.syncAll();

  updateSyncConfig = (syncConfig: SyncStoreConfig) => {
    let cfg = {...syncConfig};
    cfg.refreshTime = cfg.refreshTime * 60;
    this.syncStore.updateSyncConfig(cfg);
  }

  private reloadAllData = () => {
    this.syncStore.purgeSyncState();
    this.syncStore.syncAll();
  }  

  private configureMainNav(){
    this.mainNavService.addConfig({
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {title:  "Innstillinger", backFn: this.onBack}
    });
  }

  private onBack = () => this.router.navigate(['profil']);
}
