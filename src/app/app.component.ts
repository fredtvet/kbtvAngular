import { Component, HostListener } from '@angular/core';
import { IdentityService, LoadingService, NotificationService, DataSyncService, ConnectionService } from './core/services';
import { slideInAnimation } from './shared/animations/route-animation';
import { skip } from 'rxjs/operators';
import { TimesheetSubject } from './core/subjects/timesheet.subject';
import * as moment from 'moment';
import { Notifications } from './shared/enums/notifications.enum';

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
    private dataSyncService: DataSyncService,
    private timesheetSubject: TimesheetSubject){
    }

  ngOnInit(){
    moment.locale('nb');
    moment().startOf('isoWeek');

    this.identityService.populate();

    if(this.identityService.hasValidToken()){//Initalize data if authenticated
      this.dataSyncService.syncAll();
      this.hasSynced();
    }

    this.timesheetSubject.getAll$().subscribe()

    this.connectionService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) this.notificationService.setNotification('Du er tilkoblet internett igjen!')
      else this.notificationService.setNotification('Du er nå i frakoblet modus. Det er kun mulig å lese data.', Notifications.Warning)
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
