import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { StateCurrentUser } from '../interfaces';
import { AuthHttpFactoryService } from '../services/auth-http-factory.service';
import { LoginAction, LoginSuccessAction } from './actions.const';

@Injectable()
export class LoginHttpEffect implements Effect<LoginAction> {

    constructor(private httpFactory: AuthHttpFactoryService){}

    handle$(actions$: Observable<DispatchedAction<LoginAction, StateCurrentUser>>): Observable<LoginSuccessAction> {
        return actions$.pipe(
            listenTo([LoginAction]),
            exhaustMap(x => this.login$(x)),
        )
    }

    private login$(dispatched: DispatchedAction<LoginAction, StateCurrentUser>): Observable<LoginSuccessAction> {
        return this.httpFactory.getObserver$(LoginAction, dispatched.action.credentials).pipe(
            map(response => <LoginSuccessAction>{
                type: LoginSuccessAction,
                response, 
                previousUser: dispatched.stateSnapshot?.currentUser,
                returnUrl: dispatched.action.returnUrl
            })
        )
    }
}