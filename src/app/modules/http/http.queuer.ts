import { Injectable } from '@angular/core';
import { Store } from '@state/store';
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { QueuedCommand, StateRequestQueue } from './interfaces';
import { DispatchHttpAction } from './state/dispatch-http/dispatch-http.action';

@Injectable({ providedIn: 'root' })
export class HttpQueuer {

  private nextInQueueSubject = new BehaviorSubject<boolean>(true);

  private nextInQueue$ = this.nextInQueueSubject.asObservable().pipe(
    map(x => this.store.selectProperty<QueuedCommand[]>("requestQueue")),
    filter(x => x != null && x.length > 0),
    switchMap(queue => 
      merge(
        fromEvent(window, 'online').pipe(map(() => true)),
        of(navigator.onLine)
      ).pipe(
        first(x => x === true), //Wait for online
        tap(x => queue ? this.store.dispatch(<DispatchHttpAction>{ type: DispatchHttpAction, request: queue[0].request  }) : null)
      )
    )
  );

  constructor(private store: Store<StateRequestQueue>) {}

  initalize(): void {
    this.nextInQueue$.subscribe();
  }

  next(): void {
    this.nextInQueueSubject.next(true)
  }

}
