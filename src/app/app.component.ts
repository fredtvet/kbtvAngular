import { Component, HostListener, ApplicationRef } from '@angular/core';
import { IdentityService, NotificationService, ConnectionService, DataSyncService, AppConfigurationService } from './core/services';
import { slideInAnimation } from './shared/animations/route-animation';
import { skip, first, tap } from 'rxjs/operators';
import { Notifications } from './shared/enums/notifications.enum';
import { interval, combineLatest, concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ slideInAnimation ]
})

export class AppComponent {
  title = 'kbtv-client';

  constructor(
    appRef: ApplicationRef,
    private identityService: IdentityService,
    private connectionService: ConnectionService,
    private notificationService: NotificationService,
    private dataSyncService: DataSyncService,
    private appConfigService: AppConfigurationService,){
      if(this.identityService.hasValidToken()) this.dataSyncService.syncAll();
      //Wait for app to stabilize before initiating continuous sync interval
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const continousSync$ = combineLatest(interval(1000*60*3), this.appConfigService.config$).pipe(
        tap(x => {if(this.identityService.hasValidToken()) this.dataSyncService.syncIfTimePassed(x[1].syncRefreshTime)})
      );
      concat(appIsStable$, continousSync$).subscribe();
    }

  ngOnInit(){
    this.identityService.populate();
    
    this.connectionService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) this.notificationService.setNotification('Du er tilkoblet internett igjen!')
      else this.notificationService.setNotification('Du er nå i frakoblet modus. Det er kun mulig å lese data.', Notifications.Warning)
    });
  }


  
}
