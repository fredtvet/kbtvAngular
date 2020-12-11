import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { HttpRequest } from '@http/interfaces';
import { HttpAction } from '@http/state/http.effect';
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
            map(x => new HttpAction(this.createHttpRequest(x.action), x.stateSnapshot)),
        )
    }

    protected createHttpRequest(command: UpdateTimesheetStatusesAction): HttpRequest{
        return {
            method: "PUT", 
            body: {ids: command.ids, status: command.status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`,
            cancelMessage: "Oppdatering av timestatuser er reversert"
        }
    }

}