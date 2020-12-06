import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { HttpRequest } from 'src/app/core/services/http/interfaces';
import { HttpCommand, HttpActionId } from 'src/app/core/services/http/state/http.effect';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
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