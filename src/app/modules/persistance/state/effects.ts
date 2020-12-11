import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { StatePersisterService } from '../state-persister.service';
import { StateReaderService } from '../state-reader.service';
import { StateAction } from '@state/state.action';
import { LoadPersistedStateAction, SetPersistedCriticalStateAction, SetPersistedStateAction } from './actions.const';

@Injectable()
export class LoadCriticalStateEffect implements Effect<StateAction> {

    constructor(private stateReader: StateReaderService) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<SetPersistedCriticalStateAction> {
        return actions$.pipe(
            listenTo([LoadPersistedStateAction]),
            first(),
            map(x => 
                new SetPersistedCriticalStateAction(this.stateReader.getCriticalState())
            )
        )
    }
}

@Injectable()
export class LoadStateEffect implements Effect<SetPersistedCriticalStateAction> {

    constructor(private stateReader: StateReaderService) {}

    handle$(actions$: Observable<DispatchedAction<SetPersistedCriticalStateAction>>): Observable<SetPersistedStateAction> {
        return actions$.pipe(
            listenTo([SetPersistedCriticalStateAction]),
            first(), 
            switchMap(x => this.stateReader.getState$()),
            map(state => new  SetPersistedStateAction(state))
        )
    }
}

@Injectable()
export class InitalizeStatePersisterEffect implements Effect<StateAction> {

    constructor(private statePersister: StatePersisterService) {}

    handle$(actions$: Observable<DispatchedAction<SetPersistedStateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SetPersistedStateAction]),
            first(),
            map(x => this.statePersister.initalize())
        )
    }
}