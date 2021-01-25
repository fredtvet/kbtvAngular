import { Injectable } from '@angular/core';
import { AppNotifications } from '@shared-app/app-notifications.const';
import { NotificationService } from 'notification';
import { OptimisticHttpErrorAction } from 'optimistic-http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';

@Injectable()
export class NotifyOnOptimisticErrorEffect implements Effect<OptimisticHttpErrorAction> {

    constructor(private notificationService: NotificationService){}

    handle$(actions$: Observable<DispatchedAction<OptimisticHttpErrorAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([OptimisticHttpErrorAction]),
            map(({action}) => {
                const errors = action.optimisticErrors?.slice();
                if(action.httpError) errors.shift();
                
                if(errors.length > 0)
                    this.notificationService.notify(AppNotifications.error({
                        title: action.httpError ? "Følgefeil!" : "Noe gikk feil ved forrige økt!",
                        details: errors,
                        duration: errors.length * 2500
                    }));
            }),
        ) 
    }
}