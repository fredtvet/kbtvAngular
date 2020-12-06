import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from '../core/api-url.enum';
import { HttpRequest } from '../core/services/http/interfaces';
import { HttpActionId, HttpCommand } from '../core/services/http/state/http.effect';
import { DispatchedAction } from '../state/action-dispatcher';
import { StateAction } from '../state/interfaces';
import { Effect } from '../state/interfaces/effect.interface';
import { listenTo } from '../state/operators/listen-to.operator';

export const UpdateUserPasswordActionId = "UPDATE_USER_PASSWORD";

export interface UpdateUserPasswordCommand extends StateAction {
    newPassword: string, userName: string
}

@Injectable()
export class UpdateUserPasswordHttpEffect implements Effect<UpdateUserPasswordCommand> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateUserPasswordCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([UpdateUserPasswordActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: <HttpRequest>{
                    apiUrl: `${ApiUrl.Users}/${x.action.userName}/NewPassword`,
                    method: "PUT", 
                    body: x.action
                },
                stateSnapshot: x.stateSnapshot
            }}),
        )
    }
}