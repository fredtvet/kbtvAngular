import { Injectable } from '@angular/core';
import { StateSyncConfig } from '@sync/interfaces';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { ReloadSyncStateAction, UpdateSyncConfigAction } from './actions';

@Injectable()
export class UpdateSyncConfigEffect implements Effect<UpdateSyncConfigAction> {

    handle$(actions$: Observable<DispatchedAction<UpdateSyncConfigAction, StateSyncConfig>>): Observable<ReloadSyncStateAction> {
        return actions$.pipe(
            listenTo([UpdateSyncConfigAction]),
            filter(x => 
                x.action.syncConfig.initialNumberOfMonths !== 
                x.stateSnapshot?.syncConfig.initialNumberOfMonths
            ),
            map(x => <ReloadSyncStateAction>{ type: ReloadSyncStateAction })
        )
    }

}
