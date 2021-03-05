import { ConfirmDialogService } from 'confirm-dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { SyncConfigForm } from '@shared/constants/forms/sync-config.form.const';
import { FormService } from 'form-sheet';
import { SyncConfig } from 'state-sync';
import { ProfileFacade } from '../profile.facade';
import { ProfileAction } from './profile-action.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sync-profile',
  templateUrl: './sync-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncProfileComponent {

  navConfig: MainTopNavConfig;
  bottomActions: AppButton[];
  actions: ProfileAction[];
  
  constructor(
    private formService: FormService,
    private facade: ProfileFacade,
    private confirmService: ConfirmDialogService,
    private router: Router,
  ){
    this.navConfig = {title: "Synkronisering", backFn: this.goToProfile };
    this.bottomActions = [{icon: 'update', callback: this.syncAll}]
    this.actions = [
      {text: 'Konfigurasjoner', icon: 'settings', callback: this.updateSyncConfig,
        hint: "Konfigurer synkronisering av data med skyen"},  
      {text: 'Synkroniser data', icon: 'update', callback: this.syncAll, 
        hint: 'Hent nye og oppdaterte data fra skyen.'},
      {text: 'Slett synkronisert data', icon: 'delete_sweep',callback: this.confirmPurge,
        hint: 'Slett synkronisert data fra enheten og last inn fra skyen på nytt.'},  
    ]
  }

  private updateSyncConfig = (): void => {
    const config = this.facade.syncConfig;
    this.formService.open<SyncConfig, unknown>({
      formConfig: {...SyncConfigForm, initialValue: config ? {...config, refreshTime: config.refreshTime / 60 } : null}, 
      navConfig: {title: "Konfigurasjoner"},
      submitCallback: (val: SyncConfig) => 
        this.facade.updateSyncConfig({...val, refreshTime: val.refreshTime * 60})
    })
  }

  private confirmPurge = () => {
    this.confirmService.open({
      title: 'Slett synkronisert data?',
      message: 'All data må lastes ned på nytt. Vær varsom ved bruk av mobildata.', 
      confirmText: 'Slett',
      confirmCallback: this.facade.reloadData
    });
  }

  private syncAll = () => this.facade.syncAll();

  private goToProfile = () => this.router.navigate(['profil']);
  
}
