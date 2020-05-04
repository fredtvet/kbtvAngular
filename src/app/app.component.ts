import { Component, HostListener } from '@angular/core';
import { IdentityService, LoadingService, NotificationService, DataSyncService, ConnectionService, AppConfigurationService } from './core/services';
import { slideInAnimation } from './shared/animations/route-animation';
import { skip } from 'rxjs/operators';
import { UserTimesheetSubject } from './core/subjects/user-timesheet.subject';
import { Notifications } from './shared/enums/notifications.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ slideInAnimation ]
})

export class AppComponent {
  title = 'kbtv-client';

  constructor(
    private appConfigService: AppConfigurationService,
    private identityService: IdentityService,
    private connectionService: ConnectionService,
    private notificationService: NotificationService,
    private dataSyncService: DataSyncService){
    }

  ngOnInit(){
    this.identityService.populate();
    
    let syncTimer: any;

    this.appConfigService.config$.subscribe(config => {
      clearInterval(syncTimer);
      this.syncAllCheck(config.syncRefreshTime);
      syncTimer = setInterval(() => this.syncAllCheck(config.syncRefreshTime), 1000*60);
    });

    this.connectionService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) this.notificationService.setNotification('Du er tilkoblet internett igjen!')
      else this.notificationService.setNotification('Du er nå i frakoblet modus. Det er kun mulig å lese data.', Notifications.Warning)
    });
  }

  private syncAllCheck = (refreshTime: number): void => {
    if(this.identityService.hasValidToken()){
      const timeSinceLastSync = (new Date().getTime() / 1000) - this.dataSyncService.getEarliestTimestamp();
      if(timeSinceLastSync > refreshTime) this.dataSyncService.syncAll();           
    }
  }
}
