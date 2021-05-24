import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { HttpFactoryService } from '../../http-factory.service';
import { StateRequestQueue } from '../../interfaces';
import { HttpErrorAction } from '../http-error/http-error.action';
import { HttpQueueShiftAction } from '../http-queue-shift.action';
import { HttpSuccessAction } from '../http-success/http-success.action';
import { DispatchNextHttpAction } from './dispatch-http.action';

@Injectable()
export class DispatchHttpEffect implements Effect<DispatchNextHttpAction> {

    constructor(private httpFactory: HttpFactoryService) {}

    handle$(actions$: Observable<DispatchedAction<DispatchNextHttpAction, StateRequestQueue>>): Observable<StateAction | void> {
        return actions$.pipe(
            listenTo([DispatchNextHttpAction]),
            mergeMap(x => {
                const command = x.stateSnapshot.requestQueue[0];
                return this.httpFactory.getObserver$(command.request, command.commandId)
            }),
            map(x => x?.isDuplicate ? 
                <HttpQueueShiftAction>{ type: HttpQueueShiftAction } : 
                <HttpSuccessAction>{ type: HttpSuccessAction }
            )
        )
    }

    onErrorAction = (httpError: HttpErrorResponse) => 
        <HttpErrorAction>{ type: HttpErrorAction, httpError }
}