import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { ReloadSyncStateActionId, UpdateSyncConfigActionId, UpdateSyncConfigCommand } from './actions.const';

@Injectable()
export class UpdateSyncConfigEffect implements Effect<StateAction> {

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
