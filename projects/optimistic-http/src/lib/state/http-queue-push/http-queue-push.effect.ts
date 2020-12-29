import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { HttpQueuer } from '../../http.queuer';
import { StateRequestQueue } from '../../interfaces';
import { HttpQueuePushAction } from './http-queue-push.action';

@Injectable()
export class HttpQueuePushEffect implements Effect<HttpQueuePushAction> {

    constructor(private httpQueuer: HttpQueuer) {  }

    handle$(actions$: Observable<DispatchedAction<HttpQueuePushAction, StateRequestQueue>>): Observable<void> {
        return actions$.pipe(
            listenTo([HttpQueuePushAction]),
            map(x => {
                if(!x.stateSnapshot?.requestQueue?.length)
                    this.httpQueuer.next();
            })
        )
    }

}