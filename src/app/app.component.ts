import { ChangeDetectionStrategy, Component } from '@angular/core';
import { skip } from 'rxjs/operators';
import { DeviceInfoService, IconService, NotificationService } from './core/services';
import { Notifications } from './shared-app/enums/notifications.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  title = 'test-client';

  constructor(
    private iconService: IconService,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService){
  }

  ngOnInit(){
    this.iconService.registerIcons();

    this.deviceInfoService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) this.notificationService.notify({title: 'Du er tilkoblet internett igjen!', type: Notifications.Success})
      else this.notificationService.notify({title: 'Du er nå i frakoblet modus. Det er kun mulig å lese data.', type: Notifications.Warning})
    });   
  }
}
