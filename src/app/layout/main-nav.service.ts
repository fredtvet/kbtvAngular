import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthStore } from '../core/services/auth/auth.store';
import { DeviceInfoService } from '../core/services/device-info.service';
import { BottomNavNavigations } from './bottom-nav-navigations';
import { MainNavConfig } from './interfaces/main-nav-config.interface';
import { SideNavNavigations } from './side-nav-navigations';

@Injectable({
  providedIn: 'root'
})
export class MainNavService {

  private toggleDrawerSubject = new Subject();
  toggleDrawer$: Observable<any> = this.toggleDrawerSubject.asObservable()

  config$: Observable<MainNavConfig> = combineLatest([
    this.deviceInfoService.isXs$, 
    this.authStore.currentUser$,
    this.deviceInfoService.isOnline$, 
    ]).pipe(
      map(([isXs, user, isOnline]) => {
        return {
          isXs, 
          sideNavConfig: {user, isOnline, navigations: SideNavNavigations},
          bottomNavConfig: {navigations: BottomNavNavigations}
        } 
      }),
  );

  constructor(
    private authStore: AuthStore,
    private deviceInfoService: DeviceInfoService) {}

  toggleDrawer(): void {
    this.toggleDrawerSubject.next()
  }

}
