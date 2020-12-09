import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { HttpQueuer } from '@http/http.queuer';
import { QueuedCommand, StateRequestQueue } from '@http/interfaces';
import { HttpErrorActionId, HttpErrorCommand } from '@http/state/http-error/http-error-command.interface';
import { HttpQueueShiftActionId } from '@http/state/http-queue-shift.reducer';
import { SetPersistedStateActionId } from '@persistance/state/actions.const';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { Store } from '@state/store';
import { ContinousSyncService } from '@sync/continous-sync.service';
import { SyncStateSuccessActionId } from '@sync/state/actions.const';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { StateCurrentUser } from './global-state.interfaces';

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

    constructor(
        private httpQueuer: HttpQueuer,
        private store: Store<StateRequestQueue & StateCurrentUser>
    ) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SyncStateSuccessActionId]),
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
        const requestQueue = this.store.selectProperty<QueuedCommand[]>("requestQueue", false);

        if(!requestQueue) return;
        const firstRequest = requestQueue[0];

        if(!firstRequest?.dispatched) return; //Only check dispatched requests

        const lastCommandStatus = this.store.selectProperty<User>("currentUser", false)?.lastCommandStatus;

        if (!lastCommandStatus) 
        this.store.dispatch<HttpErrorCommand>({
            actionId: HttpErrorActionId, 
            customErrorTitle: "Noe gikk feil ved forrige økt!"
        })
        else
        this.store.dispatch({actionId: HttpQueueShiftActionId})   
    }
}