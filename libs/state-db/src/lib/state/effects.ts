import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { StateReaderService } from '../state-reader.service';
import { LoadPersistedStateAction, SetPersistedStateAction } from './actions.const';

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
