import { Injectable } from '@angular/core';
import { LoginSuccessAction } from '@core/services/auth/state/login-success/login-success.action';
import { SyncStateAction } from '@sync/state/actions';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction, Store } from 'state-management';
import { WipeStateAction } from './wipe-state.reducer';

@Injectable()
export class SyncUserOnLoginEffect implements Effect<LoginSuccessAction> {

    handle$(actions$: Observable<DispatchedAction<LoginSuccessAction>>): Observable<void | StateAction> {
        return actions$.pipe(
            listenTo([LoginSuccessAction]),
            mergeMap(({action}) => {
                const actions: StateAction[] = [<SyncStateAction>{ type: SyncStateAction, propagate: true }];

                if(action.previousUser?.userName !== action.response.user.userName) //Wipe before sync if new login
                    actions.unshift(<WipeStateAction>{ type: WipeStateAction, defaultState: Store.defaultState })

                return of(...actions)
            }),
        ) 
    }
}