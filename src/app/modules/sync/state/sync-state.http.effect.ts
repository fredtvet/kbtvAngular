import { Inject, Injectable } from '@angular/core';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { Store } from '@state/store';
import { Observable } from 'rxjs';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { SYNC_HTTP_FETCHER, SYNC_STATE_CONFIG } from '../injection-tokens.const';
import { StoreState, SyncConfig, SyncHttpFetcher, SyncStateConfig } from '../interfaces';
import { SyncStateActionId, SyncStateSuccessAction, SyncStateSuccessActionId, WipeSyncStateActionId } from './actions.const';

@Injectable()
export class SyncStateHttpEffect implements Effect<StateAction> {

    private get syncConfig(): SyncConfig { return this.store.selectProperty("syncConfig") }

    private get syncTimestamp(): number { return this.store.selectProperty("syncTimestamp") }

    constructor(
      @Inject(SYNC_HTTP_FETCHER) private httpFetcher: SyncHttpFetcher<any>,
      @Inject(SYNC_STATE_CONFIG) private syncStateConfig: SyncStateConfig<any>,
      private store: Store<StoreState>,
    ) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SyncStateActionId, WipeSyncStateActionId]),
            filter(x => navigator.onLine),
            exhaustMap(x => this.httpFetcher.fetch$(this.syncConfig, this.syncTimestamp)),
            map(x => { return <SyncStateSuccessAction>{
                actionId: SyncStateSuccessActionId,
                response: x,
                syncStateConfig: this.syncStateConfig
            }})
        )
    }
}
