import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { AUTH_DEFAULT_REDIRECTS } from '../../injection-tokens.const';
import { DefaultRedirects } from '../../interfaces';
import { AuthHttpFactoryService } from '../../services/auth-http-factory.service';
import { LogoutAction, WipeTokensAction } from '../actions.const';

@Injectable()
export class LogoutHttpEffect implements Effect<LogoutAction> {

    constructor(
        @Inject(AUTH_DEFAULT_REDIRECTS) private redirects: DefaultRedirects,
        private httpFactory: AuthHttpFactoryService,
        private router: Router,
    ){ }

    handle$(actions$: Observable<DispatchedAction<LogoutAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([LogoutAction]),
            tap(x =>  this.router.navigate([this.redirects.login], { queryParams: {returnUrl: x.action.returnUrl}})),
            map(({action}) => { 
                if(action.refreshToken) 
                    this.httpFactory.getObserver$(LogoutAction, {refreshToken: action.refreshToken}).subscribe()

                return <WipeTokensAction>{ type: WipeTokensAction }
            })
        )
    }
}