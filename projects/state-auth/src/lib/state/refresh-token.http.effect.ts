import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { exhaustMap, finalize, map, retryWhen } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { AuthHttpFactoryService } from '../services/auth-http-factory.service';
import { httpRetryStrategy } from '../http-retry.strategy';
import { RefreshTokenResponse, Tokens } from '../interfaces';
import { LogoutAction, RefreshTokenAction, RefreshTokenSuccessAction } from './actions.const';

@Injectable()
export class RefreshTokenHttpEffect implements Effect<RefreshTokenAction>{

    private isRefreshingToken: boolean = false;

    constructor(private httpFactory: AuthHttpFactoryService){ }

    handle$(actions$: Observable<DispatchedAction<RefreshTokenAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([RefreshTokenAction]),
            exhaustMap(x => this.refreshToken$(x.action.tokens)),
            map(response => {
                if(!response?.accessToken?.token) return <LogoutAction>{ type: LogoutAction };
                else return <RefreshTokenSuccessAction> { type: RefreshTokenSuccessAction, response }
            })                 
        )
    }

    onErrorAction = (err: unknown) => <LogoutAction>{ type: LogoutAction };

    private refreshToken$(tokens: Tokens): Observable<RefreshTokenResponse> {
        if(this.isRefreshingToken || !navigator.onLine) return EMPTY;

        this.isRefreshingToken = true;
        return this.httpFactory.getObserver$<RefreshTokenResponse>(RefreshTokenAction, tokens).pipe(
            retryWhen(httpRetryStrategy({excludedStatusCodes: [400]})), 
            finalize(() => this.isRefreshingToken = false)
          );
    }
    
}