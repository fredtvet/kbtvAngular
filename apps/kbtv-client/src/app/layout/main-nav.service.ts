import { Injectable } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { StateSyncTimestamp } from 'state-sync';
import { MainSideNavConfig } from './interfaces/main-side-nav-config.interface';

@Injectable({providedIn: 'root'})
export class MainNavService {

  private toggleDrawerSubject = new Subject();
  toggleDrawer$: Observable<unknown> = this.toggleDrawerSubject.asObservable();

  private drawerOpenChangedSubject = new BehaviorSubject(false);
  drawerOpenChanged$: Observable<unknown> = this.drawerOpenChangedSubject.asObservable();

  currentUser$ = this.store.selectProperty$("currentUser");

  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  sideNavHeaderConfig$: Observable<MainSideNavConfig> = combineLatest([
    this.currentUser$,
    this.store.selectProperty$("syncTimestamp"),
    this.deviceInfoService.isOnline$, 
    ]).pipe(
      map(([user, syncTimestamp, isOnline]) => {
        return {user, syncTimestamp, isOnline}
      }),
  );

  get isXs(): boolean { return this.deviceInfoService.isXs }

  constructor(
    private store: Store<StateCurrentUser & StateSyncTimestamp>,
    private deviceInfoService: DeviceInfoService) {
      this.drawerOpenChanged$.subscribe(x => console.log(x))
    }

  toggleDrawer(): void {
    this.toggleDrawerSubject.next()
  }

  setDrawerOpenState(opened: boolean): void {
    this.drawerOpenChangedSubject.next(opened)
  }

}
