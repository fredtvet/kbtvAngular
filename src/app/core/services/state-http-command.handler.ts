import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { ApiService, NotificationService } from '.';
import { AppErrorResponse } from '../interceptors/http.error.interceptor';
import { IStateHttpCommandHandler } from '../state/interfaces/state-http-command-handler.interface';
import { StateHttpCommand } from '../state/state-http-converter/state-http-command.interface';
import { NotificationType } from './notification/notification-type.enum';

interface Request<TState> { command: StateHttpCommand<TState>, state: TState}

@Injectable({ providedIn: 'root' })
export class StateHttpCommandHandler<TState> extends ObservableStore<TState> implements IStateHttpCommandHandler<TState>{  
    
    private requestQueue: Request<TState>[] = [];

    private nextInQueueSubject = new BehaviorSubject<boolean>(null);
    
    private nextInQueue$ = this.nextInQueueSubject.asObservable().pipe(
      map(x => this.requestQueue[0]), //add null check
      tap(x => console.log('nextInQueue', x)),
      filter(x => x != null),
      tap(cmd => this.dispatchHttp(cmd.command)),
    );

    constructor(private apiService: ApiService, private notificationService: NotificationService){ 
      super({logStateChanges: true, trackStateHistory: false});
      this.nextInQueue$.subscribe();
    }

    dispatch(command: StateHttpCommand<TState>): void {   
      if(!command) console.error("No state http command provided")
      //If no state changes, ignore queue and run request
      if(!command.stateFunc) this.getHttpCommandObserver(command).subscribe();

      //HUSK ONYL GET CERTAIN STATES,NO REFRESH TOKEN ETC
      let request = {command, state: this.getState(false)};

      this.setState(command.stateFunc(this.getState(false)), null, true, false)

      this.addRequestToQueue(request);
    }

    private addRequestToQueue(request: Request<TState>){
      this.requestQueue.push(request);
      if(this.requestQueue.length === 1) this.nextInQueueSubject.next(true);  
    }

    private dispatchHttp(command: StateHttpCommand<TState>){
      this.getHttpCommandObserver(command).pipe(
       catchError(err => this.onHttpError()), 
       tap(x => this.onHttpSuccess()) //Add next id to queue
      ).subscribe();
    }

    private onHttpSuccess(){
      this.requestQueue.shift();
      this.nextInQueueSubject.next(true);
    }

    private onHttpError(): Observable<void> {
        const queueClone = this.requestQueue.slice();
        this.requestQueue = [];

        if(queueClone[0].command.stateFunc) 
          this.setState(queueClone[0].state,null, true, false)
        
        let errorMessages = queueClone.map(x => x.command.cancelMessage);

        this.notificationService.notify({ 
          title: "Følgefeil!",  
          details: errorMessages,
          type: NotificationType.Error
        });
   
        return EMPTY;
    }

    private getHttpCommandObserver(command: {httpMethod: "POST" | "PUT" | "DELETE", apiUrl: string, httpBody: any}){
      switch(command.httpMethod){
          case "POST": return this.apiService.post(command.apiUrl, command.httpBody);
          case "PUT": return this.apiService.put(command.apiUrl, command.httpBody);
          case "DELETE": return this.apiService.delete(command.apiUrl);
      }
    }

}
