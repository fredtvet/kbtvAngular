import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { Store } from '@state/store';
import { AuthService } from '@core/services/auth';
import { SYNC_HTTP_FETCHER } from '../injection-tokens.const';
import { StoreState, SyncConfig, SyncHttpFetcher, SyncStoreTimestamps } from '../interfaces';
import { SyncStateActionId, SyncStateSuccessActionId, WipeSyncStateActionId } from './actions.const';

@Injectable()
export class SyncStateHttpEffect implements Effect<StateAction> {

    private get syncConfig(): SyncConfig { return this.store.selectProperty("syncConfig") }

    private get syncTimestamps(): SyncStoreTimestamps { return this.store.selectProperty("syncTimestamps") }

    constructor(
      @Inject(SYNC_HTTP_FETCHER) private httpFetcher: SyncHttpFetcher,
      private authService: AuthService,
      private store: Store<StoreState>,
    ) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SyncStateActionId, WipeSyncStateActionId]),
            filter(x => navigator.onLine && this.authService.isAuthorized),
            exhaustMap(x => this.httpFetcher.fetch$(this.syncConfig, this.syncTimestamps)),
            map(x => { return {
                actionId: SyncStateSuccessActionId,
                response: x
            }})
        )
    }
}
