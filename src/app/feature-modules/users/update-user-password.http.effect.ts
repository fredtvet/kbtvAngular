import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { HttpAction } from '@http/state/http.effect';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { StateAction } from '@state/state.action';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class UpdateUserPasswordAction extends StateAction {
    constructor(
        public newPassword: string, 
        public userName: string
    ){ super() }
}

@Injectable()
export class UpdateUserPasswordHttpEffect implements Effect<UpdateUserPasswordAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateUserPasswordAction>>): Observable<HttpAction> {
        return actions$.pipe(
            listenTo([UpdateUserPasswordAction]),
            map(x => new HttpAction(
                {
                    apiUrl: `${ApiUrl.Users}/${x.action.userName}/NewPassword`,
                    method: "PUT", 
                    body: x.action
                },
                x.stateSnapshot
            ))
        )
    }
}