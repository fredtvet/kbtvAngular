import { Injectable } from '@angular/core';
import { fromEvent, Observable, merge, Observer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})

export class DeviceInfoService {

  constructor(private breakpointObserver: BreakpointObserver) { console.log("DeviceInfoService");}

  isOnline = navigator.onLine;

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
}
