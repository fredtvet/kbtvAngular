import { Injectable } from "@angular/core"
import { Immutable } from "global-types"
import { Observable, of } from "rxjs"
import { mergeMap } from "rxjs/operators"
import { DispatchedAction, Effect, listenTo, StateAction } from "state-management"
import { CompletedCommand, StateRequestQueue } from "../../interfaces"
import { HttpErrorAction } from "../http-error/http-error.action"
import { OptimisticHttpErrorAction } from "../optimistic-http-error.action"
import { AppendRequestLogAction } from "../request-log/append-request-log.action"

@Injectable()
export class HttpErrorEffect implements Effect<StateAction> {

    constructor() { }

    handle$(actions$: Observable<DispatchedAction<HttpErrorAction, StateRequestQueue>>): Observable<Immutable<AppendRequestLogAction | OptimisticHttpErrorAction>> {
        return actions$.pipe(
            listenTo([HttpErrorAction]),
            mergeMap(x => {
                const completedCommands = x.stateSnapshot.requestQueue.map(
                    ({request}) => { return <CompletedCommand> { request, succeeded: false } }
                )
                const appendAction: Immutable<AppendRequestLogAction> = {
                    type: AppendRequestLogAction,
                    completedCommands
                };

                const canceledCommands = completedCommands.slice();
                const errorCommand = <CompletedCommand> canceledCommands.shift();
                const optimisticErrorAction: Immutable<OptimisticHttpErrorAction> = {
                    httpError: x.action.httpError,
                    type: OptimisticHttpErrorAction,   
                    canceledCommands, errorCommand,

                }

                return of(optimisticErrorAction, appendAction);
            })
        )
    }
}