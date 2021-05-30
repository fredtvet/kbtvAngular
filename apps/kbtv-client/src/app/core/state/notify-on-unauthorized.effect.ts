import { Injectable } from '@angular/core';
import { AppNotifications } from '@shared-app/constants/app-notifications.const';
import { NotificationService } from 'notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnauthorizedAction } from 'state-auth';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';

@Injectable()
export class NotifyOnUnauthorizedEffect implements Effect<StateAction> {

    constructor(private notificationService: NotificationService){}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([UnauthorizedAction]),
            map(x => {
                this.notificationService.notify(AppNotifications.error({
                    title: 'Du mangler riktig autorisasjon for å gå inn på denne siden.'
                }))
            }),
        ) 
    }
}