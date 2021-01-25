import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { HttpFactoryService } from '../../http-factory.service';
import { HttpErrorAction } from '../http-error/http-error.action';
import { HttpSuccessAction } from '../http-success/http-success.action';
import { DispatchHttpAction } from './dispatch-http.action';

@Injectable()
export class DispatchHttpEffect implements Effect<DispatchHttpAction> {

    constructor(private httpFactory: HttpFactoryService) {}

    handle$(actions$: Observable<DispatchedAction<DispatchHttpAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([DispatchHttpAction]),
            mergeMap(x => this.httpFactory.getObserver$(x.action.request)),
            map(x => <HttpSuccessAction>{ type: HttpSuccessAction })
        )
    }

    onErrorAction = (httpError: HttpErrorResponse) => 
        <HttpErrorAction>{ type: HttpErrorAction, httpError }
}