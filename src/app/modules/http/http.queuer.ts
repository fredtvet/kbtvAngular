import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@state/store';
import { User } from '@core/models/user.interface';
import { DeviceInfoService } from '@core/services/device-info.service';
import { QueuedCommand, State } from './interfaces';
import { DispatchHttpActionId, DispatchHttpCommand } from './state/dispatch-http/dispatch-http-command.interface';
import { HttpErrorActionId, HttpErrorCommand } from './state/http-error/http-error-command.interface';
import { HttpQueueShiftActionId } from './state/http-queue-shift.reducer';

@Injectable({ providedIn: 'root' })
export class HttpQueuer {

  private nextInQueueSubject = new BehaviorSubject<boolean>(null);

  private nextInQueue$ = this.nextInQueueSubject.asObservable().pipe(
    map(x => this.store.selectProperty<QueuedCommand[]>("requestQueue", false)),
    filter(x => x && x.length > 0),
    switchMap(queue => 
      this.deviceInfoService.isOnline$.pipe(
        first(x => x === true), //Wait for online
        tap(x => this.store.dispatch(<DispatchHttpCommand>{
          actionId: DispatchHttpActionId, 
          request: queue[0].request
        }))
      )
    )
  );

  constructor(
    private deviceInfoService: DeviceInfoService,
    private store: Store<State>
  ) {}

  initalize(): void {
    this.checkForUnhandledRequests();
    this.nextInQueue$.subscribe();
  }

  next(): void {
    this.nextInQueueSubject.next(true)
  }

  //Checks if there are unhandled requests persisted when initalizing. 
  //i.e. if app is closed before receiving request response
  //Waits for sync call to provide last command status for user, to check if it was successful or not. 
  private checkForUnhandledRequests(): void {
    const requestQueue = this.store.selectProperty<QueuedCommand[]>("requestQueue", false);

    if(!requestQueue) return;
    const firstRequest = requestQueue[0];

    if(!firstRequest?.dispatched) return; //Only check dispatched requests

    const lastCommandStatus = this.store.selectProperty<User>("currentUser", false)?.lastCommandStatus;

    if (!lastCommandStatus) 
      this.store.dispatch<HttpErrorCommand>({
        actionId: HttpErrorActionId, 
        customErrorTitle: "Noe gikk feil ved forrige økt!"
      })
    else
      this.store.dispatch({actionId: HttpQueueShiftActionId})   
  }

}
