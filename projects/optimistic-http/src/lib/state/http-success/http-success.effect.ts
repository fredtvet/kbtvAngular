import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { HttpQueuer } from '../../http.queuer';
import { StateRequestQueue } from '../../interfaces';
import { AppendRequestLogAction } from '../request-log/append-request-log.action';
import { HttpSuccessAction } from './http-success.action';

@Injectable()
export class HttpSuccessEffect implements Effect<HttpSuccessAction> {

    constructor(private httpQueuer: HttpQueuer) {}

    handle$(actions$: Observable<DispatchedAction<HttpSuccessAction, StateRequestQueue>>): Observable<AppendRequestLogAction> {
        return actions$.pipe(
            listenTo([HttpSuccessAction]),
            map(x => {
                this.httpQueuer.next();
                const currRequest = x.stateSnapshot.requestQueue[0];
                return <AppendRequestLogAction> {
                    type: AppendRequestLogAction,
                    completedCommands: [{
                        request: currRequest.request, 
                        commandId: currRequest.commandId, 
                        succeeded: true
                    }]
                };
            })
        )
    }

}