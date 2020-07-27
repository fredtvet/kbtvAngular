import { Component, ApplicationRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { AuthService, NotificationService, DeviceInfoService, DataSyncService, IconService, DataSyncConfig } from './core/services';
import { skip, first, tap } from 'rxjs/operators';
import { Notifications } from './shared-app/enums/notifications.enum';
import { interval, combineLatest, concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  @ViewChild('downloadFrame') downloadFrame: ElementRef;
  title = 'test-client';

  constructor(
    appRef: ApplicationRef,
    private iconService: IconService,
    private authService: AuthService,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
    private dataSyncService: DataSyncService,
    private syncConfig: DataSyncConfig){
      this.initalizeSync(appRef)
  }

  ngOnInit(){
    this.iconService.registerIcons();
    
    this.authService.populate();

    this.deviceInfoService.isOnline$.pipe(skip(1)).subscribe(isOnline => {
      if(isOnline) this.notificationService.notify({title: 'Du er tilkoblet internett igjen!', type: Notifications.Success})
      else this.notificationService.notify({title: 'Du er nå i frakoblet modus. Det er kun mulig å lese data.', type: Notifications.Warning})
    });   
  }

  private initalizeSync(appRef: ApplicationRef){
    if(!this.authService.hasAccessTokenExpired()) this.dataSyncService.syncAll();
    //Wait for app to stabilize before initiating continuous sync interval
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));

    const continousSync$ = combineLatest(interval(1000*60*3), this.syncConfig.syncRefreshTime$).pipe(
      tap(x => {if(!this.authService.hasAccessTokenExpired()) this.dataSyncService.syncIfTimePassed(x[1])})
    );

    concat(appIsStable$, continousSync$).subscribe();
  }
  
}
