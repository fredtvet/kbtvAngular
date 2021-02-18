import { Injectable } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { ImmutableArray, Maybe } from "global-types";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Store } from 'state-management';
import { ModelStateConfig, UnknownModelState } from "state-model";
import { ModelColDefFactory } from "../model-col-def.factory";

@Injectable()
export class ModelDataTableFacade  {

    private modelPropertySubject = new BehaviorSubject<Maybe<string>>(null)

    private modelProperty$: Observable<Maybe<string>> = 
        this.modelPropertySubject.asObservable().pipe(distinctUntilChanged())

    rowData$: Observable<ImmutableArray<unknown>> = 
        combineLatest([this.store.state$, this.modelProperty$]).pipe(
            map(([state, prop]) => (prop && state) ? state[prop] : [])
        )

    colDefs$: Observable<Maybe<ColDef[]>> = this.modelProperty$.pipe(map(x => 
        x ? this.colDefFactory.createColDefs(x) : []
    ))

    get modelIdentifier(): Maybe<string> { 
        return this.modelPropertySubject.value ? 
        ModelStateConfig.get(this.modelPropertySubject.value)?.idProp : null
    }

    constructor(
        private store: Store<UnknownModelState>,
        private colDefFactory: ModelColDefFactory,
    ) { }

    updateSelectedProperty = (prop: string): void => this.modelPropertySubject.next(prop); 
}