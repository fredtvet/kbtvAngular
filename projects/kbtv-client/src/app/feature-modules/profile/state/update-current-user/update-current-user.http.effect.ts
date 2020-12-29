import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { OptimisticHttpRequest, OptimisticHttpAction } from 'optimistic-http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { UpdateCurrentUserAction } from './update-current-user.action';

@Injectable()
export class UpdateCurrentUserHttpEffect implements Effect<UpdateCurrentUserAction> {

    constructor(){}

    handle$(actions$: Observable<DispatchedAction<UpdateCurrentUserAction>>): Observable<OptimisticHttpAction> {
        return actions$.pipe(
            listenTo([UpdateCurrentUserAction]),
            map(x => <OptimisticHttpAction>{ 
                type: OptimisticHttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot 
            }),  
        )
    }

    protected createHttpRequest(action: UpdateCurrentUserAction): OptimisticHttpRequest {
        return {
            method: "PUT", 
            body: action.user, 
            apiUrl: ApiUrl.Auth, 
            cancelMessage: "Oppdatering av profil er reversert"
        }
    }

}