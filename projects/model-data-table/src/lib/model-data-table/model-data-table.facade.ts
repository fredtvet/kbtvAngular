import { Inject, Injectable } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { UnknownState } from "global-types";
import { ImmutableArray, Maybe } from "global-types";
import { Observable } from "rxjs";
import { BehaviorSubject, combineLatest } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { StateAction, Store } from 'state-management';
import { ModelCommand, ModelStateConfig, UnknownModelState } from "state-model";
import { MODEL_DATA_TABLES_CONFIG } from "../injection-tokens.const";
import { ModelDataTablesConfig } from "../interfaces";
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
        ModelStateConfig.get(this.modelPropertySubject.value)?.identifier : null
    }

    constructor(
        private store: Store<UnknownModelState>,
        private colDefFactory: ModelColDefFactory,
    ) { }

    updateSelectedProperty = (prop: string): void => this.modelPropertySubject.next(prop); 
}