import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
import { Store } from 'src/app/state/store';
import { LoginSuccessActionId, LoginSuccessCommand } from '../../core/services/auth/state/login-success/login-success-command.interface';
import { SyncStateActionId } from '../../core/services/sync/state/actions.const';
import { WipeStateActionId, WipeStateCommand } from './wipe-state.reducer';

@Injectable()
export class SyncUserOnLoginEffect implements Effect<LoginSuccessCommand> {

    handle$(actions$: Observable<DispatchedAction<LoginSuccessCommand>>): Observable<void | StateAction> {
        return actions$.pipe(
            listenTo([LoginSuccessActionId]),
            mergeMap(x => {
                const actions: StateAction[] = [{actionId: SyncStateActionId}];

                if(x.action.previousUser.userName !== x.action.user.userName) //Wipe before sync if new login
                    actions.unshift(<WipeStateCommand>{actionId: WipeStateActionId, defaultState: Store.defaultState})

                return of(...actions)
            }),
        ) 
    }

}