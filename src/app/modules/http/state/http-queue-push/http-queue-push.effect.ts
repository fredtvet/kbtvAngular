import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { HttpQueuer } from '../../http.queuer';
import { HttpQueuePushAction } from './http-queue-push.action';
import { StateRequestQueue } from '@http/interfaces';

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