import { Injectable } from '@angular/core';
import { HttpQueuer, StateRequestQueue } from 'optimistic-http';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SetPersistedStateAction } from 'state-db';
import { DispatchedAction, Effect, listenTo, Store } from 'state-management';
import { ContinousSyncService, SyncStateSuccessAction } from 'state-sync';
import { StateCurrentUser } from './global-state.interfaces';

@Injectable()
export class InitalizeSyncEffect implements Effect<SetPersistedStateAction> {

    constructor(private continousSyncService: ContinousSyncService) {}

    handle$(actions$: Observable<DispatchedAction<SetPersistedStateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SetPersistedStateAction]),
            first(),
            map(x => this.continousSyncService.initalize()),
        ) 
    }
}

@Injectable()
export class InitalizeHttpQueueEffect implements Effect<SyncStateSuccessAction> {

    constructor(
        private httpQueuer: HttpQueuer,
        private store: Store<StateRequestQueue & StateCurrentUser>
    ) {}

    handle$(actions$: Observable<DispatchedAction<SyncStateSuccessAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SyncStateSuccessAction]),
            first(),
            map(x => {
                console.log(this.store.state.currentUser)
                if(!this.store.state.currentUser) return;
                const {lastCommandId, lastCommandStatus} = this.store.state.currentUser;
                this.httpQueuer.initalize({lastCommandId, lastCommandStatus})
            }),
        ) 
    }
}