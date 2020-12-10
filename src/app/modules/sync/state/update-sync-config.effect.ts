import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Effect, DispatchedAction, StateAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { ReloadSyncStateActionId, UpdateSyncConfigActionId, UpdateSyncConfigCommand } from './actions.const';

@Injectable()
export class UpdateSyncConfigEffect implements Effect<UpdateSyncConfigCommand> {

    handle$(actions$: Observable<DispatchedAction<UpdateSyncConfigCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([UpdateSyncConfigActionId]),
            filter(x => 
                x.action.syncConfig.initialNumberOfMonths !== 
                x.stateSnapshot.syncConfig.initialNumberOfMonths
            ),
            map(x => { 
                return { actionId: ReloadSyncStateActionId }
            })
        )
    }

}
