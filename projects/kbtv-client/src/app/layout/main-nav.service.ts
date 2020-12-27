import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { DeviceInfoService } from '@core/services/device-info.service';
import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { Store } from '@state/store';
import { StateSyncTimestamp } from '@sync/interfaces';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BottomNavNavigations } from './bottom-nav-navigations';
import { MainNavConfig } from './interfaces/main-nav-config.interface';
import { SideNavNavigations } from './side-nav-navigations';

@Injectable({providedIn: 'root'})
export class MainNavService {

  private toggleDrawerSubject = new Subject();
  toggleDrawer$: Observable<unknown> = this.toggleDrawerSubject.asObservable()

  config$: Observable<MainNavConfig> = combineLatest([
    this.deviceInfoService.isXs$, 
    this.store.selectProperty$<User>("currentUser"),
    this.store.selectProperty$<number>("syncTimestamp"),
    this.deviceInfoService.isOnline$, 
    ]).pipe(
      map(([isXs, user, syncTimestamp, isOnline]) => {
        return {
          isXs, 
          sideNavConfig: {user, syncTimestamp, isOnline, navigations: SideNavNavigations},
          bottomNavigations: BottomNavNavigations
        } 
      }),
  );

  constructor(
    private store: Store<StateCurrentUser & StateSyncTimestamp>,
    private deviceInfoService: DeviceInfoService) {}

  toggleDrawer(): void {
    this.toggleDrawerSubject.next()
  }

}