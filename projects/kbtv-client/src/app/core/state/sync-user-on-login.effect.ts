import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Store } from '@state/store';
import { LoginSuccessAction } from '@core/services/auth/state/login-success/login-success.action';
import { StateAction } from '@state/state.action';
import { WipeStateAction } from './wipe-state.reducer';
import { SyncStateAction } from '@sync/state/actions';

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