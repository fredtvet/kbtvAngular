import { Injectable } from '@angular/core';
import { NotificationService, NotificationType } from 'notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { StateRequestQueue } from '../../interfaces';
import { HttpErrorAction } from './http-error.action';

@Injectable()
export class HttpErrorEffect implements Effect<HttpErrorAction> {

    constructor(private notificationService: NotificationService) {}

    handle$(actions$: Observable<DispatchedAction<HttpErrorAction, StateRequestQueue>>): Observable<void> {
        return actions$.pipe(
            listenTo([HttpErrorAction]),
            map(x => {
                const errorMessages =
                    x.stateSnapshot?.requestQueue?.map(x => x.request.cancelMessage);
                    
                if(!errorMessages) return;
    
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