import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { StateAction, Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { HttpFactoryService } from '../../http-factory.service';
import { HttpErrorActionId, HttpErrorCommand } from '../http-error/http-error-command.interface';
import { HttpSuccessActionId } from '../http-success/http-success-command.interface';
import { DispatchHttpActionId, DispatchHttpCommand } from './dispatch-http-command.interface';

@Injectable()
export class DispatchHttpEffect implements Effect<DispatchHttpCommand> {

    constructor(private httpFactory: HttpFactoryService) {}

    handle$(actions$: Observable<DispatchedAction<DispatchHttpCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([DispatchHttpActionId], false),
            mergeMap(x => this.httpFactory.getObserver$(x.action.request)),
            map(x => { return { actionId: HttpSuccessActionId }}) 
        )
    }

    onErrorAction = (err: any) => { return <HttpErrorCommand>{
        actionId: HttpErrorActionId, 
        ignoreInitialError: true, 
    }}
}