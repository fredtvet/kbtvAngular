import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { StatePersisterService } from '../state-persister.service';
import { StateReaderService } from '../state-reader.service';
import { LoadPersistedStateActionId, SetPersistedCriticalStateActionId, SetPersistedStateActionId } from './actions.const';

@Injectable()
export class LoadCriticalStateEffect implements Effect<StateAction> {

    constructor(private stateReader: StateReaderService) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([LoadPersistedStateActionId]),
            first(),
            map(action => { 
                const state = this.stateReader.getCriticalState();
                return { actionId: SetPersistedCriticalStateActionId, state }
            })
        )
    }

}

@Injectable()
export class LoadStateEffect implements Effect<StateAction> {

    constructor(private stateReader: StateReaderService) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SetPersistedCriticalStateActionId]),
            first(), 
            switchMap(x => this.stateReader.getState$()),
            map(state => { 
                return { actionId: SetPersistedStateActionId, state }
            })
        )
    }

}

@Injectable()
export class InitalizeStatePersisterEffect implements Effect<StateAction> {

    constructor(private statePersister: StatePersisterService) {} //CYCLIC DEPEDENCY, MÅ HA EGEN ACTIONDISPATCHER OG HÅNNDTERE SELV

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SetPersistedStateActionId]),
            first(),
            map(x => this.statePersister.initalize())
        )
    }

}