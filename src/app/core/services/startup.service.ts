import { Injectable } from '@angular/core';
import { skip } from 'rxjs/operators';
import { DeviceInfoService } from './device-info.service';
import { IconService } from './icon.service';
import { NotificationType } from './notification/notification-type.enum';
import { NotificationService } from './notification/notification.service';
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
      else notificationService.notify({title: 'Du er nå i frakoblet modus. Det er kun mulig å lese data.', type: NotificationType.Warning})
    });  
  }
}
