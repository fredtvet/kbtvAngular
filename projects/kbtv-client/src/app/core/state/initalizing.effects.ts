import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { HttpQueuer } from '@http/http.queuer';
import { QueuedCommand, StateRequestQueue } from '@http/interfaces';
import { HttpErrorAction } from '@http/state/http-error/http-error.action';
import { HttpQueueShiftAction } from '@http/state/http-queue-shift.reducer';
import { SetPersistedStateAction } from '@persistance/state/actions.const';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Store } from '@state/store';
import { ContinousSyncService } from '@sync/continous-sync.service';
import { SyncStateSuccessAction } from '@sync/state/actions';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
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