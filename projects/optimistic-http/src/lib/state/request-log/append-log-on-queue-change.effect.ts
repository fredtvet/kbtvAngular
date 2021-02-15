import { Injectable } from "@angular/core"
import { Immutable } from "global-types"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Effect } from "state-management"
import { listenTo } from "state-management"
import { DispatchedAction, StateAction } from "state-management"
import { OptimisticHttpRequest, StateRequestQueue } from "../../interfaces"
import { HttpErrorAction } from "../http-error/http-error.action"
import { HttpQueueShiftAction } from "../http-queue-shift.action"
import { HttpSuccessAction } from "../http-success/http-success.action"
import { AppendRequestLogAction } from "./append-request-log.action"

@Injectable()
export class AppendLogOnQueueChangeEffect implements Effect<StateAction> {

    constructor() { }

    handle$(actions$: Observable<DispatchedAction<StateAction, StateRequestQueue>>): Observable<AppendRequestLogAction> {
        return actions$.pipe(
            listenTo([HttpQueueShiftAction, HttpSuccessAction, HttpErrorAction]),
            map(x => {
                const currRequest = x.stateSnapshot.requestQueue[0];
                const appendAction: Partial<AppendRequestLogAction> = {
                    type: AppendRequestLogAction
                };

                if(x.action.type === HttpErrorAction) 
                    appendAction.completedCommands = 
                        x.stateSnapshot.requestQueue.map(({commandId, request, ...rest}) => { return { commandId, request, succeeded: false } })
                else 
                    appendAction.completedCommands = [{
                        request: currRequest.request, 
                        commandId: currRequest.commandId, 
                        succeeded: true
                    }]

                return <AppendRequestLogAction> appendAction;
            })
        )
    }
}