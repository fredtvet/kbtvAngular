import { Injectable } from '@angular/core';
import { fromEvent, Observable, merge, Observer, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

export interface DeviceInfo {
  isOnline: boolean;
  isXs: boolean;
}

@Injectable({providedIn: 'root'})
export class DeviceInfoService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  get isOnline(){ return navigator.onLine };

  isOnline$ = merge<boolean>(
    fromEvent(window, 'offline').pipe(map(() => false)),
    fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
    }));

  isXs$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )

  isS$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    )


  deviceInfo$ = combineLatest([this.isOnline$, this.isXs$]).pipe(
    map(([isOnline, isXs])=> { return {isOnline, isXs} })
  )
}
