import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { DeviceInfoService } from '@core/services/device-info.service';
import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { StateSyncTimestamp } from 'state-sync';
import { MainSideNavConfig } from './interfaces/main-side-nav-config.interface';

@Injectable({providedIn: 'root'})
export class MainNavService {

  private toggleDrawerSubject = new Subject();

  toggleDrawer$: Observable<unknown> = this.toggleDrawerSubject.asObservable()

  currentUser$: Observable<User> = this.store.selectProperty$<User>("currentUser");

  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  sideNavHeaderConfig$: Observable<MainSideNavConfig> = combineLatest([
    this.currentUser$,
    this.store.selectProperty$<number>("syncTimestamp"),
    this.deviceInfoService.isOnline$, 
    ]).pipe(
      map(([user, syncTimestamp, isOnline]) => {
        return {user, syncTimestamp, isOnline}
      }),
  );

  get isXs(): boolean { return this.deviceInfoService.isXs }

  constructor(
    private store: Store<StateCurrentUser & StateSyncTimestamp>,
    private deviceInfoService: DeviceInfoService) {}

  toggleDrawer(): void {
    this.toggleDrawerSubject.next()
  }

}
