import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { HttpRequest } from '@http/interfaces';
import { HttpCommand, HttpActionId } from '@http/state/http.effect';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { UpdateStatusesActionId, UpdateStatusesStateCommand } from './update-statuses-state-command.interface';

@Injectable()
export class UpdateStatusesHttpEffect implements Effect<UpdateStatusesStateCommand> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateStatusesStateCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([UpdateStatusesActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}),
        )
    }

    protected createHttpRequest(command: UpdateStatusesStateCommand): HttpRequest{
        return {
            method: "PUT", 
            body: {ids: command.ids, status: command.status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`,
            cancelMessage: "Oppdatering av timestatuser er reversert"
        }
    }

}