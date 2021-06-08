import { Injectable } from '@angular/core';
import { HttpQueuer } from 'optimistic-http';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { SetPersistedStateAction } from 'state-db';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { ContinousSyncService, SyncStateSuccessAction } from 'state-sync';

@Injectable()
export class InitalizeSyncEffect implements Effect<SetPersistedStateAction> {

    constructor(private continousSyncService: ContinousSyncService) {}

    handle$(actions$: Observable<DispatchedAction<SetPersistedStateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SetPersistedStateAction]),
            filter(x => x.action.storageType === "idb-keyval"), 
            first(),
            map(x => this.continousSyncService.start()),
        ) 
    }
}

@Injectable()
export class InitalizeHttpQueueEffect implements Effect<SyncStateSuccessAction> {

    constructor(private httpQueuer: HttpQueuer) {}

    handle$(actions$: Observable<DispatchedAction<SyncStateSuccessAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SyncStateSuccessAction]),
            first(),
            map(x => this.httpQueuer.initalize()),
        ) 
    }
}