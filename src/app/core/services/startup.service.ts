import { Injectable } from '@angular/core';
import { IconService } from './icon.service';
import { PersistanceStore } from './persistance/persistance.store';
import { SyncStore } from './sync/sync.store';

@Injectable({providedIn: 'root'})
export class StartupService {

  constructor(
    syncStore: SyncStore,
    persistanceStore: PersistanceStore,
    iconService: IconService,
  ) { 
    persistanceStore.init();
    syncStore.init();
    iconService.registerIcons();
  }
}
