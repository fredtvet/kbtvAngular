import { Component, HostListener } from '@angular/core';
import { IdentityService, LoadingService, NotificationService, DataSyncService, ConnectionService } from './core';
import { slideInAnimation } from './route-animation';
import { RouterOutlet } from '@angular/router';
import { NOTIFICATIONS } from './shared/notifications.enum';
import { skip, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ slideInAnimation ]
})

export class AppComponent {
  title = 'kbtv-client';

  private syncAllowed: boolean = true;

  constructor(
    private identityService: IdentityService,
    public loadingService: LoadingService,
    private connectionService: ConnectionService,
    public notificationService: NotificationService,
    private dataSyncService: DataSyncService){
    }

  ngOnInit(){
    this.identityService.populate();

    if(this.identityService.hasValidToken()){//Initalize data if authenticated
      this.dataSyncService.syncAll();
      this.hasSynced();
    }


    this.connectionService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) this.notificationService.setNotification('Du er tilkoblet internett igjen!')
      else this.notificationService.setNotification('Du er nå i frakoblet modus. Det er kun mulig å lese data.', NOTIFICATIONS.Warning)
    });
  }

  @HostListener('document:visibilitychange') //Update data incase of long periods in background
  dataSync() {
    if(!this.syncAllowed) return null;

    const state = document.visibilityState;

    if(state == 'visible') {
      this.dataSyncService.syncAll();
      this.hasSynced();
    };
  }

  private hasSynced(){
    this.syncAllowed = false;
    setTimeout(() => {this.syncAllowed = true}, 1000*60*60) //Only once per hour
  }
}
