import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateDbService } from 'state-db';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';

export const ClearAndLogoutAction = "CLEAR_AND_LOGOUT_ACTION";
export interface ClearAndLogoutAction extends StateAction {}

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