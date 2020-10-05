import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SyncStore, SyncStoreConfig } from 'src/app/core/services/sync';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  syncConfig$ = this.syncStore.syncConfig$;

  navConfig: MainTopNavConfig;

  constructor(
    private router: Router,
    private confirmService: ConfirmDialogService,
    private syncStore: SyncStore
  ) {
    this.navConfig = {title:  'Innstillinger', backFn: this.onBack}
  }

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

  onBack = () => this.router.navigate(['profil']);

  private reloadAllData = () => {
    this.syncStore.purgeSyncState();
    this.syncStore.syncAll();
  }  

}
