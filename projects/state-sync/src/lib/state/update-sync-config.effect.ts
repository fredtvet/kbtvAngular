import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { StateSyncConfig } from '../interfaces';
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
