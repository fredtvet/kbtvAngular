import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, EMPTY, Observable } from 'rxjs';
import { catchError, filter, first, map, tap } from 'rxjs/operators';
import { User } from '../../models/user.interface';
import { ObservableStore } from '../state/abstracts/observable-store';
import { ObservableStoreBase } from '../state/observable-store-base';
import { ApiService } from '../api.service';
import { DeviceInfoService } from '../device-info.service';
import { NotificationService } from '../notification';
import { NotificationType } from '../notification/notification-type.enum';
import { SyncStore } from '../sync';
import { StateCurrentUser } from '../state/interfaces/global-state.interfaces';
import { HttpCommand } from './http-command.interface';

interface State extends StateCurrentUser { requestQueue: QueuedCommand[]; };

interface QueuedCommand { command: HttpCommand, stateSnapshot: any };

@Injectable({ providedIn: 'root' })
export class HttpCommandHandler extends ObservableStore<State> {

  private get requestQueue(): QueuedCommand[] {
    return this.getStateProperty<QueuedCommand[]>("requestQueue", false) || [];
  }

  private nextInQueueSubject = new BehaviorSubject<boolean>(null);

  private nextInQueue$ = this.nextInQueueSubject.asObservable().pipe(
    map(x => this.requestQueue[0]),
    filter(x => x != null),
    tap(queued => this.dispatchHttp(queued.command))
  );

  constructor(
    base: ObservableStoreBase,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private deviceInfoService: DeviceInfoService,
    syncStore: SyncStore) {
    super(base);

    syncStore.hasInitialSynced$.subscribe(x => {
      this.checkForGhostErrors();
      this.nextInQueue$.subscribe();
    });

  }

  handle(command: HttpCommand, stateSnapshot?: any): void {
    if (!command)
      console.error("No state http command provided");
    //If no state changes, ignore queue and run request
    if (!stateSnapshot) {
      this.getHttpCommandObserver(command).subscribe();
      return;
    };

    const requestQueue = this.requestQueue;
    requestQueue.push({ command, stateSnapshot });

    this.setState({ requestQueue }, null, false); //No need to deep clone request queue

    if (requestQueue.length === 1)
      this.nextInQueueSubject.next(true);
  }

  private dispatchHttp(command: HttpCommand) {
    concat(
      this.deviceInfoService.isOnline$.pipe(first(x => x === true)),
      this.getHttpCommandObserver(command).pipe(
        catchError(err => this.onHttpError(true)),
        tap(x => this.onHttpSuccess()) //Add next id to queue
      )
    ).subscribe();
  }

  private onHttpSuccess() {
    const requestQueue = this.requestQueue;
    requestQueue.shift();
    this.setState({ requestQueue }, null, false);
    this.nextInQueueSubject.next(true);
  }

  private onHttpError(ignoreInitial?: boolean, customTitle?: string): Observable<void> {
    const requestQueue = this.requestQueue;
    const currentRequest = requestQueue[0];

    if (currentRequest.stateSnapshot)
      this.setState({ ...currentRequest.stateSnapshot, requestQueue: [] }, null, true);

    let errorMessages = requestQueue.map(x => x.command.cancelMessage);
    if (ignoreInitial)
      errorMessages.shift();

    if (errorMessages.length > 0)
      this.notificationService.notify({
        title: customTitle || "Følgefeil!",
        details: errorMessages,
        type: NotificationType.Error,
        duration: errorMessages.length * 2500
      });

    return EMPTY;
  }

  //Checks if there are unhandled http errors when initalizing. 
  //i.e. if app is closed while request is processing, and it returns error. 
  //Waits for sync call to provide last command status for user, to check if it was successful or not. 
  private checkForGhostErrors(): void {
    const lastCommandStatus = this.getStateProperty<User>("currentUser")?.lastCommandStatus;

    if (!lastCommandStatus && this.requestQueue.length > 0)
      this.onHttpError(false, "Noe gikk feil ved forrige økt!");
  }

  private getHttpCommandObserver(command: { httpMethod: "POST" | "PUT" | "DELETE"; apiUrl: string; httpBody: any; }) {
    switch (command.httpMethod) {
      case "POST": return this.apiService.post(command.apiUrl, command.httpBody);
      case "PUT": return this.apiService.put(command.apiUrl, command.httpBody);
      case "DELETE": return this.apiService.delete(command.apiUrl);
    }
  }
}
