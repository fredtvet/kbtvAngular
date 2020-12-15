import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { httpRetryStrategy } from '@shared-app/http-retry.strategy';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { StateAction } from '@state/state.action';
import { EMPTY, Observable } from 'rxjs';
import { exhaustMap, finalize, map, retryWhen } from 'rxjs/operators';
import { DeviceInfoService } from '../../device-info.service';
import { RefreshTokenResponse, Tokens } from '../interfaces';
import { LogoutAction } from './logout/logout.action';
import { RefreshTokenSuccessAction } from './refresh-token-success.reducer';

export const RefreshTokenAction = "REFRESH_TOKEN_ACTION";
export interface RefreshTokenAction extends StateAction {
    tokens: Tokens  
}

@Injectable()
export class RefreshTokenHttpEffect implements Effect<RefreshTokenAction>{

    private isRefreshingToken: boolean = false;

    constructor(
        private apiService: ApiService,
        private deviceInfoService: DeviceInfoService,
    ){ }

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
        if(this.isRefreshingToken || !this.deviceInfoService.isOnline) return EMPTY;

        this.isRefreshingToken = true;
    
        return this.apiService.post<RefreshTokenResponse>(ApiUrl.Auth + '/refresh', tokens)
          .pipe(
            retryWhen(httpRetryStrategy({excludedStatusCodes: [400]})), 
            finalize(() => this.isRefreshingToken = false)
          );
    }
}