import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Credentials } from '../interfaces';
import { StateAction } from '@state/state.action';
import { LoginSuccessAction } from './login-success/login-success.action';

export class LoginAction extends StateAction { 
    constructor(
        public credentials: Credentials,
        public returnUrl?: string 
    ){ super() }   
}

@Injectable()
export class LoginHttpEffect implements Effect<LoginAction> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<LoginAction>>): Observable<LoginSuccessAction> {
        return actions$.pipe(
            listenTo([LoginAction]),
            exhaustMap(x => this.login$(x)),
        )
    }

    private login$(dispatched: DispatchedAction<LoginAction>): Observable<LoginSuccessAction> {
        return this.apiService.post(ApiUrl.Auth + '/login', dispatched.action.credentials).pipe(
            map(response => new LoginSuccessAction(
                response, 
                dispatched.stateSnapshot.currentUser,
                dispatched.action.returnUrl
            ))
        )
    }
}