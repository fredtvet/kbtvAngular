import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { exhaustMap, finalize, map, retryWhen } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { httpRetryStrategy } from '@shared-app/http-retry.strategy';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { DeviceInfoService } from '../../device-info.service';
import { RefreshTokenResponse } from '../interfaces';
import { LogoutActionId } from './logout/logout-command.interface';
import { RefreshTokenSuccessActionId } from './refresh-token-success.reducer';

export const RefreshTokenActionId = "REFRESH_TOKEN";

export interface RefreshTokenCommand extends StateAction {
    refreshToken: string, accessToken: string
}

@Injectable()
export class RefreshTokenHttpEffect implements Effect<RefreshTokenCommand>{

    private isRefreshingToken: boolean = false;

    constructor(
        private apiService: ApiService,
        private deviceInfoService: DeviceInfoService,
    ){ }

    handle$(actions$: Observable<DispatchedAction<RefreshTokenCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([RefreshTokenActionId]),
            exhaustMap(x => this.refreshToken$(x.action)),
            map(tokens => {
                if(!tokens?.accessToken?.token) return {actionId: LogoutActionId};
                else return {actionId: RefreshTokenSuccessActionId, ...tokens}
            }),                   
        )
    }

    onErrorAction = (err: any) => { return {actionId: LogoutActionId} }

    private refreshToken$(action: RefreshTokenCommand): Observable<RefreshTokenResponse> {
        if(this.isRefreshingToken || !this.deviceInfoService.isOnline) return EMPTY;

        this.isRefreshingToken = true;
    
        return this.apiService.post(ApiUrl.Auth + '/refresh', action)
          .pipe(
            retryWhen(httpRetryStrategy({excludedStatusCodes: [400]})), 
            finalize(() => this.isRefreshingToken = false)
          );
    }
}