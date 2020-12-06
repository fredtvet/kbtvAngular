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