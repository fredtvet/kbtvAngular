import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { StateDbService } from 'state-db';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { ClearAndLogoutAction, UpdatePasswordAction } from './actions.const';

@Injectable()
export class UpdatePasswordHttpEffect implements Effect<UpdatePasswordAction> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<UpdatePasswordAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([UpdatePasswordAction]),
            mergeMap(({action}) => 
                this.apiService.put<void>(`${ApiUrl.Auth}/changePassword`, action)),
        )
    }

}

@Injectable()
export class ClearAndLogoutEffect implements Effect<ClearAndLogoutAction> {

    constructor(private stateDbService: StateDbService){}

    handle$(actions$: Observable<DispatchedAction<ClearAndLogoutAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([ClearAndLogoutAction]),
            map(x => {         
                this.stateDbService.clear$().subscribe(x => {
                    window.localStorage.clear();
                    window.location.reload()
                });    
            }),
        )
    }

}