import { Injectable } from '@angular/core';
import { ContinousSyncService } from '@sync/continous-sync.service';
import { SyncStateSuccessAction } from '@sync/state/actions';
import { HttpErrorAction, HttpQueuer, HttpQueueShiftAction, StateRequestQueue } from 'optimistic-http';
import { SetPersistedStateAction } from 'persistance';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, Store } from 'state-management';
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
                this.checkForUnhandledRequests();
                this.httpQueuer.initalize()
            }),
        ) 
    }

    //Checks if there are unhandled requests persisted when initalizing. 
    //i.e. if app is closed before receiving request response
    //Waits for sync call to provide last command status for user, to check if it was successful or not. 
    private checkForUnhandledRequests(): void {
        const requestQueue = this.store.state.requestQueue;

        if(!requestQueue) return;
        const firstRequest = requestQueue[0];

        if(!firstRequest?.dispatched) return; //Only check dispatched requests

        const lastCommandStatus = this.store.state.currentUser?.lastCommandStatus;

        if (!lastCommandStatus) 
            this.store.dispatch(<HttpErrorAction>{ 
                type: HttpErrorAction, 
                ignoreInitialError: false, 
                customErrorTitle: "Noe gikk feil ved forrige økt!" 
            })
        else
            this.store.dispatch(<HttpQueueShiftAction>{ type: HttpQueueShiftAction }) 
    }
}