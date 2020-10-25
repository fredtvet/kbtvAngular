import { Injectable } from '@angular/core';
import { skip } from 'rxjs/operators';
import { NotificationService, NotificationType } from 'src/app/shared-app/notification';
import { DeviceInfoService } from './device-info.service';
import { IconService } from './icon.service';
import { PersistanceStore } from './persistance/persistance.store';
import { SyncStore } from './sync/sync.store';

@Injectable({providedIn: 'root'})
export class StartupService {

  constructor(
    syncStore: SyncStore,
    persistanceStore: PersistanceStore,
    deviceInfoService: DeviceInfoService,
    iconService: IconService,
    notificationService: NotificationService
  ) { 
    persistanceStore.init();

    syncStore.init();

    iconService.registerIcons();
    
    deviceInfoService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) notificationService.notify({title: 'Du er tilkoblet internett igjen!', type: NotificationType.Success})
      else notificationService.notify({title: 'Du er nå i frakoblet modus. Noen funksjoner er deaktivert.', type: NotificationType.Warning})
    });  
  }
}
