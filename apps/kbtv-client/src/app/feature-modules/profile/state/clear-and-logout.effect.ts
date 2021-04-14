import { ClearAndLogoutAction } from '@actions/profile-actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateDbService } from 'state-db';
import { DispatchedAction, Effect, listenTo } from 'state-management';

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