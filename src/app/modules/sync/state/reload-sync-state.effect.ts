import { Inject, Injectable } from '@angular/core';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { StateAction } from '@state/state.action';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SYNC_STATE_CONFIG } from '../injection-tokens.const';
import { SyncStateConfig } from '../interfaces';
import { ReloadSyncStateAction, SyncStateAction, WipeSyncStateAction } from './actions';

@Injectable()
export class ReloadSyncStateEffect implements Effect<StateAction> {

    constructor(
      @Inject(SYNC_STATE_CONFIG) private syncStateConfig: SyncStateConfig<any>,
    ) { }

    handle$(actions$: Observable<DispatchedAction<ReloadSyncStateAction>>): Observable<WipeSyncStateAction | SyncStateAction> {
        return actions$.pipe(
            listenTo([ReloadSyncStateAction]), 
            mergeMap(x => of(
                <WipeSyncStateAction>{ type: WipeSyncStateAction, syncStateConfig: this.syncStateConfig },
                <SyncStateAction>{ type: SyncStateAction }
            )), 
        )
    }

}