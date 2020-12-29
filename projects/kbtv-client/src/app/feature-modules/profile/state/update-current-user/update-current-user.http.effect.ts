import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { HttpRequest } from '@http/interfaces';
import { listenTo } from 'state-management'
import { HttpAction } from '@http/state/http.effect';
import { Effect, DispatchedAction } from 'state-management'
import { UpdateCurrentUserAction } from './update-current-user.action';

@Injectable()
export class UpdateCurrentUserHttpEffect implements Effect<UpdateCurrentUserAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateCurrentUserAction>>): Observable<HttpAction> {
        return actions$.pipe(
            listenTo([UpdateCurrentUserAction]),
            map(x => <HttpAction>{ 
                type: HttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot 
            }),  
        )
    }

    protected createHttpRequest(action: UpdateCurrentUserAction): HttpRequest{
        return {
            method: "PUT", 
            body: action.user, 
            apiUrl: ApiUrl.Auth, 
            cancelMessage: "Oppdatering av profil er reversert"
        }
    }

}