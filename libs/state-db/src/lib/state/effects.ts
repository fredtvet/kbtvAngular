import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { first, map, skip, switchMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { StatePersisterService } from '../state-persister.service';
import { StateReaderService } from '../state-reader.service';
import { LoadPersistedStateAction,  SetPersistedStateAction } from './actions.const';

@Injectable()
export class LoadStateEffect implements Effect<LoadPersistedStateAction> {

    constructor(private stateReader: StateReaderService) {}

    handle$(actions$: Observable<DispatchedAction<LoadPersistedStateAction>>): Observable<SetPersistedStateAction> {
        return actions$.pipe(
            listenTo([LoadPersistedStateAction]),
            first(), 
            switchMap(x => merge(
                this.stateReader.get$("idb-keyval").pipe(map(state => {
                    return <SetPersistedStateAction>{ type: SetPersistedStateAction, storageType: "idb-keyval", state }
                })),
                this.stateReader.get$("localStorage").pipe(map(state => {
                    return <SetPersistedStateAction>{ type: SetPersistedStateAction, storageType: "localStorage", state }
                })),
            )),
        )
    }
}

@Injectable()
export class InitalizeStatePersisterEffect implements Effect<StateAction> {

    constructor(private statePersister: StatePersisterService) {}

    handle$(actions$: Observable<DispatchedAction<SetPersistedStateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([SetPersistedStateAction]),
            skip(1), first(),
            map(x => this.statePersister.initalize())
        )
    }
}