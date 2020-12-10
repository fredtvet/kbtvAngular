import { Inject, Injectable } from '@angular/core';
import { StateAction, DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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