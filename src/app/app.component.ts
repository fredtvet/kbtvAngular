import { Component } from '@angular/core';
import { IdentityService, LoadingService, NotificationService, DataSyncService } from './core';
import { slideInAnimation } from './route-animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'kbtv-client';

  constructor(
    private identityService: IdentityService,
    public loadingService: LoadingService,
    public notificationService: NotificationService,
    private dataSyncService: DataSyncService){
    }

  ngOnInit(){
    this.identityService.populate();

    if(this.identityService.hasValidToken()) //Initalize mission list if authenticated
      this.dataSyncService.syncAll().subscribe(x => this.notificationService.setNotification('Synkronisert!'));

  }


}
