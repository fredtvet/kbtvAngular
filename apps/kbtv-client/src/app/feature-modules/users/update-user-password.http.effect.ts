import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { OptimisticHttpAction } from 'optimistic-http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';

export const UpdateUserPasswordAction = "UPDATE_USER_PASSWORD_ACTION";
export interface UpdateUserPasswordAction extends StateAction {
    newPassword: string, 
    userName: string
}

@Injectable()
export class UpdateUserPasswordHttpEffect implements Effect<UpdateUserPasswordAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateUserPasswordAction>>): Observable<OptimisticHttpAction> {
        return actions$.pipe(
            listenTo([UpdateUserPasswordAction]),
            map(x => <OptimisticHttpAction>{
                type: OptimisticHttpAction, propagate: true,
                request: {
                    apiUrl: `${ApiUrl.Users}/${x.action.userName}/NewPassword`,
                    method: "PUT", 
                    body: x.action
                },
                stateSnapshot: x.stateSnapshot
            })
        )
    }
}