import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction, Store } from 'state-management';
import { SYNC_HTTP_FETCHER, SYNC_STATE_CONFIG } from '../injection-tokens.const';
import { SyncHttpFetcher, SyncStateConfig } from '../interfaces';
import { SyncStateAction, SyncStateSuccessAction, WipeSyncStateAction } from './actions';
import { StoreState } from "../store-state.interface";

@Injectable()
export class SyncStateHttpEffect implements Effect<StateAction> {

    private get syncConfig() { return this.store.state.syncConfig }

    private get syncTimestamp() { return this.store.state.syncTimestamp }

    constructor(
      @Inject(SYNC_HTTP_FETCHER) private httpFetcher: SyncHttpFetcher<unknown>,
      @Inject(SYNC_STATE_CONFIG) private syncStateConfig: SyncStateConfig<unknown>,
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
