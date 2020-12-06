import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
import { SYNC_STATE_CONFIG } from '../injection-tokens.const';
import { SyncStateConfig } from '../interfaces';
import { ReloadSyncStateActionId, SyncStateActionId, UpdateSyncConfigCommand, WipeSyncStateActionId } from './actions.const';

@Injectable()
export class ReloadSyncStateEffect implements Effect<StateAction> {

    constructor(
      @Inject(SYNC_STATE_CONFIG) private syncStateConfig: SyncStateConfig<any>,
    ) { }

    handle$(actions$: Observable<DispatchedAction<UpdateSyncConfigCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([ReloadSyncStateActionId]), 
            mergeMap(x => of(
                {actionId: WipeSyncStateActionId, syncStateConfig: this.syncStateConfig},
                {actionId: SyncStateActionId}
            )), 
        )
    }

}