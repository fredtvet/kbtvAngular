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
import { UpdateCurrentUserActionId, UpdateCurrentUserStateCommand } from './update-current-user-state-command.interface';

@Injectable()
export class UpdateCurrentUserHttpEffect implements Effect<UpdateCurrentUserStateCommand> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateCurrentUserStateCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([UpdateCurrentUserActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}),  
        )
    }

    protected createHttpRequest(action: UpdateCurrentUserStateCommand): HttpRequest{
        return {
            method: "PUT", 
            body: action.user, 
            apiUrl: ApiUrl.Auth, 
            cancelMessage: "Oppdatering av profil er reversert"
        }
    }

}