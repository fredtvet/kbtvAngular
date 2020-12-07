import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { HttpQueuer } from '@http/http.queuer';
import { SetPersistedStateActionId } from '@persistance/state/actions.const';
import { ContinousSyncService } from '@sync/continous-sync.service';
import { SyncStateSuccessActionId } from '@sync/state/actions.const';

@Injectable()
export class InitalizeSyncEffect implements Effect<StateAction> {

    constructor(private continousSyncService: ContinousSyncService) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SetPersistedStateActionId]),
            first(),
            map(x => this.continousSyncService.initalize()),
        ) 
    }

}
@Injectable()
export class InitalizeHttpQueueEffect implements Effect<StateAction> {

    constructor(private httpQueuer: HttpQueuer) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SyncStateSuccessActionId]),
            first(),
            map(x => this.httpQueuer.initalize()),
        ) 
    }

}