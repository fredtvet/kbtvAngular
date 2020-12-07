import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService, NotificationType } from '@notification/index';
import { DispatchedAction } from '@state/action-dispatcher';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { HttpErrorActionId, HttpErrorCommand } from './http-error-command.interface';

@Injectable()
export class HttpErrorEffect implements Effect<HttpErrorCommand> {

    constructor(private notificationService: NotificationService) {}

    handle$(actions$: Observable<DispatchedAction<HttpErrorCommand>>): Observable<void> {
        return actions$.pipe(
            listenTo([HttpErrorActionId]),
            map(x => {
            
                const errorMessages =
                    x.stateSnapshot.requestQueue?.map(x => x.request.cancelMessage);
    
                if (x.action.ignoreInitialError) errorMessages.shift();
                
                if (errorMessages.length > 0)
                    this.notificationService.notify({
                        title: x.action.customErrorTitle || "Følgefeil!",
                        details: errorMessages,
                        type: NotificationType.Error,
                        duration: errorMessages.length * 2500
                    });
            })
        )
    }

}