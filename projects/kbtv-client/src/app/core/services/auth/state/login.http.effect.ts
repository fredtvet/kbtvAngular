import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { Credentials } from '../interfaces';
import { LoginSuccessAction } from './login-success/login-success.action';

export const LoginAction = "LOGIN_ACTION";
export interface LoginAction extends StateAction {
    credentials: Credentials,
    returnUrl?: string  
}

@Injectable()
export class LoginHttpEffect implements Effect<LoginAction> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<LoginAction, StateCurrentUser>>): Observable<LoginSuccessAction> {
        return actions$.pipe(
            listenTo([LoginAction]),
            exhaustMap(x => this.login$(x)),
        )
    }

    private login$(dispatched: DispatchedAction<LoginAction, StateCurrentUser>): Observable<LoginSuccessAction> {
        return this.apiService.post(ApiUrl.Auth + '/login', dispatched.action.credentials).pipe(
            map(response => <LoginSuccessAction>{
                type: LoginSuccessAction,
                response, 
                previousUser: dispatched.stateSnapshot?.currentUser,
                returnUrl: dispatched.action.returnUrl
            })
        )
    }
}