import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { HttpQueuer } from '../http.queuer';
import { HttpQueueShiftAction } from './http-queue-shift.action';

@Injectable()
export class HttpQueueNextEffect implements Effect<HttpQueueShiftAction> {

    constructor(private httpQueuer: HttpQueuer) {}

    handle$(actions$: Observable<DispatchedAction<HttpQueueShiftAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([HttpQueueShiftAction]),
            map(x => this.httpQueuer.next())
        )
    }

}