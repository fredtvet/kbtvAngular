import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Store } from 'state-management';
import { StateRequestQueue } from './interfaces';
import { DispatchHttpAction } from './state/dispatch-http/dispatch-http.action';
import { HttpQueueShiftAction } from './state/http-queue-shift.action';

/** Class responsible for queuing and dispatching http requests ({@link OptimisticHttpRequest}) 
 * Requires initalization by consumer. */
@Injectable({ providedIn: 'root' })
export class HttpQueuer {

  private nextInQueueSubject = new BehaviorSubject<boolean>(true);

  private nextInQueue$ = this.nextInQueueSubject.asObservable().pipe(
    map(x => this.store.state.requestQueue),
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

  /** Initalizes the queue 
   *  @param lastCommandStatus The status of the last sent request from previous session.  
  */
  initalize(lastCommandStatus?: boolean): void {
    this.checkForUnhandledRequests(lastCommandStatus); 
    this.nextInQueue$.subscribe();
  }

  /** Allows the next in queue to execute. Should be called cautiously.  */
  next(): void {
    this.nextInQueueSubject.next(true)
  }

  //Checks if there are unhandled requests persisted when initalizing. 
  //i.e. if app is closed before receiving request response
  //Waits for sync call to provide last command status for user, to check if it was successful or not. 
  private checkForUnhandledRequests(lastCommandStatus?: boolean): void {
      const requestQueue = this.store.state.requestQueue;

      if(!requestQueue) return;
      const firstRequest = requestQueue[0];

      //If dispatched & status is true, remove request from queue.
      if(firstRequest?.dispatched && lastCommandStatus)  
          this.store.dispatch(<HttpQueueShiftAction>{ type: HttpQueueShiftAction })  
  }

}
