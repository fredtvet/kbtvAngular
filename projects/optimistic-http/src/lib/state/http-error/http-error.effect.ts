import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { StateRequestQueue } from '../../interfaces';
import { OptimisticHttpErrorAction } from '../optimistic-http-error.action';
import { HttpErrorAction } from './http-error.action';

@Injectable()
export class HttpErrorEffect implements Effect<HttpErrorAction> {

    constructor() {}

    handle$(actions$: Observable<DispatchedAction<HttpErrorAction, StateRequestQueue>>): Observable<OptimisticHttpErrorAction> {
        return actions$.pipe(
            listenTo([HttpErrorAction]),
            map(x => <OptimisticHttpErrorAction>{
                type: OptimisticHttpErrorAction,
                httpError: x.action.httpError,
                optimisticErrors: x.stateSnapshot?.requestQueue?.map(x => x.request.cancelMessage)
            })
        )
    }

}