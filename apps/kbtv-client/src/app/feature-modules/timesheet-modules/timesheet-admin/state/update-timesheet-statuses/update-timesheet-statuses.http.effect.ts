import { UpdateTimesheetStatusesAction } from '@actions/timesheet-actions';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { Immutable } from 'global-types';
import { OptimisticHttpRequest, OptimisticHttpAction } from 'optimistic-http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';

@Injectable()
export class UpdateTimesheetStatusesHttpEffect implements Effect<UpdateTimesheetStatusesAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateTimesheetStatusesAction>>): Observable<OptimisticHttpAction> {
        return actions$.pipe(
            listenTo([UpdateTimesheetStatusesAction]),
            map(x => <OptimisticHttpAction>{ 
                type: OptimisticHttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot
            }),
        )
    }

    protected createHttpRequest(command: Immutable<UpdateTimesheetStatusesAction>): OptimisticHttpRequest {
        return {
            method: "PUT", 
            body: {ids: command.ids, status: command.status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`,
            callerAction: command
        }
    }

}