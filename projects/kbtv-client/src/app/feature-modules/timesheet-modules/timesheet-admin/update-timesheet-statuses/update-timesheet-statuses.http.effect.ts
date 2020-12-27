import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { HttpRequest } from '@http/interfaces';
import { HttpAction } from '@http/state/http.effect';
import { Immutable } from '@global/interfaces';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateTimesheetStatusesAction } from './update-timesheet-statuses.action';

@Injectable()
export class UpdateTimesheetStatusesHttpEffect implements Effect<UpdateTimesheetStatusesAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateTimesheetStatusesAction>>): Observable<HttpAction> {
        return actions$.pipe(
            listenTo([UpdateTimesheetStatusesAction]),
            map(x => <HttpAction>{ 
                type: HttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot 
            }),
        )
    }

    protected createHttpRequest(command: Immutable<UpdateTimesheetStatusesAction>): HttpRequest{
        return {
            method: "PUT", 
            body: {ids: command.ids, status: command.status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`,
            cancelMessage: "Oppdatering av timestatuser er reversert"
        }
    }

}