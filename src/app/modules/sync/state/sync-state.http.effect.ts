import { Inject, Injectable } from '@angular/core';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { StateAction } from '@state/state.action';
import { Store } from '@state/store';
import { Observable } from 'rxjs';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { SYNC_HTTP_FETCHER, SYNC_STATE_CONFIG } from '../injection-tokens.const';
import { StoreState, SyncConfig, SyncHttpFetcher, SyncStateConfig } from '../interfaces';
import { SyncStateAction, SyncStateSuccessAction, WipeSyncStateAction } from './actions';

@Injectable()
export class SyncStateHttpEffect implements Effect<StateAction> {

    private get syncConfig() { return this.store.selectProperty<SyncConfig>("syncConfig") }

    private get syncTimestamp() { return this.store.selectProperty<number>("syncTimestamp") }

    constructor(
      @Inject(SYNC_HTTP_FETCHER) private httpFetcher: SyncHttpFetcher<any>,
      @Inject(SYNC_STATE_CONFIG) private syncStateConfig: SyncStateConfig<any>,
      private store: Store<StoreState>,
    ) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<SyncStateSuccessAction> {
        return actions$.pipe(
            listenTo([SyncStateAction, WipeSyncStateAction]),
            filter(x => navigator.onLine),
            exhaustMap(x => this.httpFetcher.fetch$(this.syncConfig, this.syncTimestamp)),
            map(response => <SyncStateSuccessAction>{ type: SyncStateSuccessAction, response, syncStateConfig: this.syncStateConfig })
        )
    }
}
