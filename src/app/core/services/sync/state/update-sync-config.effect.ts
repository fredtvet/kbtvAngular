import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
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
