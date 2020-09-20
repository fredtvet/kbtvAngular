import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { BehaviorSubject, concat, EMPTY, Observable } from 'rxjs';
import { catchError, filter, first, map, tap } from 'rxjs/operators';
import { ApiService, DeviceInfoService, NotificationService } from '..';
import { User } from '../../models/user.interface';
import { StateCurrentUser } from '../../state';
import { IStateHttpCommandHandler } from '../../state/interfaces/state-http-command-handler.interface';
import { StateHttpCommand } from '../../state/state-http-converter/state-http-command.interface';
import { NotificationType } from '../notification/notification-type.enum';
import { SyncStore } from '../sync';
import { OptimisticStateConfig } from './optimistic-state.config';

interface State extends StateCurrentUser { requestQueue: Request[]; };
interface Request { command: StateHttpCommand<any>, state: any};

@Injectable({ providedIn: 'root' })
export class StateHttpCommandHandler extends ObservableStore<State> 
  implements IStateHttpCommandHandler{  
  
    private get requestQueue(): Request[]{
      return this.getStateProperty<Request[]>("requestQueue", false) || [];
    }

    private nextInQueueSubject = new BehaviorSubject<boolean>(null);
    
    private nextInQueue$ = this.nextInQueueSubject.asObservable().pipe(
      map(x => this.requestQueue[0]), //add null check
      filter(x => x != null),
      tap(cmd => this.dispatchHttp(cmd.command)),
    );

    constructor(
      private apiService: ApiService, 
      private notificationService: NotificationService,
      private deviceInfoService: DeviceInfoService,
      syncStore: SyncStore){ 
      super({logStateChanges: false, trackStateHistory: true});
      
      syncStore.hasInitialSynced$.subscribe(x => {
        this.checkForGhostErrors();
        this.nextInQueue$.subscribe();
      });

    }

    dispatch(command: StateHttpCommand<any>): void {   
      if(!command) console.error("No state http command provided")
      //If no state changes, ignore queue and run request
      const stateFunc = command.stateFunc; 
      if(!stateFunc){ 
        this.getHttpCommandObserver(command).subscribe()
        return;
      };
      delete command.stateFunc; //Dont store state func
      //HUSK ONYL GET CERTAIN STATES,NO REFRESH TOKEN ETC  
      let request = {command, state: this.getOptimisticState()};
      const requestQueue = this.requestQueue;
      requestQueue.push(request)
      
      this.setState({...stateFunc(this.getState(false)), requestQueue}, null, true, false)

      if(requestQueue.length === 1) this.nextInQueueSubject.next(true);  
    }

    private dispatchHttp(command: StateHttpCommand<any>){
      //Isonline merge (elns) må completes (via true) så good to go. 
      concat(
        this.deviceInfoService.isOnline$.pipe(first(x => x === true)),
        this.getHttpCommandObserver(command).pipe(
          catchError(err => this.onHttpError()), 
          tap(x => this.onHttpSuccess()) //Add next id to queue
        )
      ).subscribe();
    }

    private onHttpSuccess(){
      const requestQueue = this.requestQueue;
      requestQueue.shift()
      this.setState({requestQueue}, null, true, false);
      this.nextInQueueSubject.next(true);
    }

    private onHttpError(): Observable<void> {
        const requestQueue = this.requestQueue;
        const currentRequest = requestQueue[0];

        if(currentRequest.state) 
          this.setState({...currentRequest.state, requestQueue: []}, null, true, false)
        
        let errorMessages = requestQueue.map(x => x.command.cancelMessage);

        this.notificationService.notify({ 
          title: "Følgefeil!",  
          details: errorMessages,
          type: NotificationType.Error
        });
   
        return EMPTY;
    }

    private getOptimisticState(): Object{
      let state = this.getState(false);
      let optimisticState = {};
      for(let prop in state){
        if(OptimisticStateConfig[prop]) optimisticState[prop] = state[prop]
      }
      return optimisticState;
    }

    //Checks if there are unhandled http errors when initalizing. 
    //i.e. if app is closed while request is processing, and it returns error. 
    //Waits for sync call to provide last command status for user, to check if it was successful or not. 
    private checkForGhostErrors(): void{  
      const lastCommandStatus = 
        this.getStateProperty<User>("currentUser")?.lastCommandStatus;

      if(!lastCommandStatus && this.requestQueue.length > 0) 
        this.onHttpError();   
    }

    private getHttpCommandObserver(command: {httpMethod: "POST" | "PUT" | "DELETE", apiUrl: string, httpBody: any}){
      switch(command.httpMethod){
          case "POST": return this.apiService.post(command.apiUrl, command.httpBody);
          case "PUT": return this.apiService.put(command.apiUrl, command.httpBody);
          case "DELETE": return this.apiService.delete(command.apiUrl);
      }
    }
}
