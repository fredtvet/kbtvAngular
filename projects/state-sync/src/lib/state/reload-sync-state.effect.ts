import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { SYNC_STATE_CONFIG } from '../injection-tokens.const';
import { SyncStateConfig } from '../interfaces';
import { ReloadSyncStateAction, SyncStateAction, WipeSyncStateAction } from './actions';

@Injectable()
export class ReloadSyncStateEffect implements Effect<StateAction> {

    constructor(
      @Inject(SYNC_STATE_CONFIG) private syncStateConfig: SyncStateConfig<unknown>,
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