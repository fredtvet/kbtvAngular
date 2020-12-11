import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { HttpRequest } from '@http/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { HttpAction } from '@http/state/http.effect';
import { Effect, DispatchedAction } from '@state/interfaces';
import { UpdateCurrentUserAction } from './update-current-user.action';

@Injectable()
export class UpdateCurrentUserHttpEffect implements Effect<UpdateCurrentUserAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateCurrentUserAction>>): Observable<HttpAction> {
        return actions$.pipe(
            listenTo([UpdateCurrentUserAction]),
            map(x => new HttpAction(this.createHttpRequest(x.action), x.stateSnapshot)),  
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