import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { ReloadSyncStateAction, UpdateSyncConfigAction } from './actions';

@Injectable()
export class UpdateSyncConfigEffect implements Effect<UpdateSyncConfigAction> {

    handle$(actions$: Observable<DispatchedAction<UpdateSyncConfigAction>>): Observable<ReloadSyncStateAction> {
        return actions$.pipe(
            listenTo([UpdateSyncConfigAction]),
            filter(x => 
                x.action.syncConfig.initialNumberOfMonths !== 
                x.stateSnapshot.syncConfig.initialNumberOfMonths
            ),
            map(x => new ReloadSyncStateAction())
        )
    }

}
