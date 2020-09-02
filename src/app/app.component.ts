import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeviceInfoService, IconService, NotificationService, PersistanceStore } from './core/services';
import { skip } from 'rxjs/operators';
import { NotificationType } from './core/services/notification';
import { SyncStore } from './core/services/sync';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  title = 'test-client';

  constructor(
    syncStore: SyncStore,
    persistanceStore: PersistanceStore,
    deviceInfoService: DeviceInfoService,
    iconService: IconService,
    notificationService: NotificationService){
    
    iconService.registerIcons();
    
    deviceInfoService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) notificationService.notify({title: 'Du er tilkoblet internett igjen!', type: NotificationType.Success})
      else notificationService.notify({title: 'Du er nå i frakoblet modus. Det er kun mulig å lese data.', type: NotificationType.Warning})
    });  

  }
}
