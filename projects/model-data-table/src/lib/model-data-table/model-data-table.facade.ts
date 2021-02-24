import { Inject, Injectable } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { ImmutableArray, KeyVal, Maybe, UnknownState } from "global-types";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { Store } from 'state-management';
import { FetchModelsAction, ModelStateConfig, MODEL_PROP_TRANSLATIONS, StateIsFetching, UnknownModelState } from "state-model";
import { ModelColDefFactory } from "../model-col-def.factory";

export interface ViewModel { colDefs: Maybe<ColDef[]>, rowData: ImmutableArray<unknown>, noRowsText: string }

@Injectable()
export class ModelDataTableFacade  {

    private modelPropertySubject = new BehaviorSubject<Maybe<string>>(null)

    get modelIdentifier(): Maybe<string> { 
        return this.modelPropertySubject.value ? 
        ModelStateConfig.get(this.modelPropertySubject.value)?.idProp : null
    }

    vm$: Observable<ViewModel> = this.modelPropertySubject.asObservable().pipe(
        distinctUntilChanged(),
        map(x => { return { prop: x, colDefs: x ? this.colDefFactory.createColDefs(x) : [] }}),
        switchMap(x => 
            combineLatest([
                this.getNoRowsText$(x.prop),
                x.prop ? this.store.selectProperty$(x.prop) : of(null)
            ]).pipe(
                map(([noRowsText, models]) => { 
                    return <ViewModel> { colDefs: x.colDefs, rowData: models || [], noRowsText }
                })
            )
        ),
    )

    constructor(
        private store: Store<UnknownModelState & StateIsFetching<UnknownState>>,
        private colDefFactory: ModelColDefFactory,    
        @Inject(MODEL_PROP_TRANSLATIONS) private translations: KeyVal<string>
    ) { }

    updateSelectedProperty = (prop: string): void => {
        this.store.dispatch(<FetchModelsAction<UnknownModelState>>{ type: FetchModelsAction, props: [prop] });
        this.modelPropertySubject.next(prop); 
    }

    private getNoRowsText$(prop: Maybe<string>): Observable<string>{
        return this.store.selectProperty$<Record<string, boolean>>("isFetching").pipe(map(isFetchingMap => {
            const isFetching = prop != null && isFetchingMap != null && isFetchingMap[prop];
            if(!prop) return 'Ingen data model valgt';
            if(!navigator.onLine) return "Mangler internett-tilkobling";
            
            const translatedProp = this.translations[prop.toLowerCase()]?.toLowerCase() || 'data';
            if(isFetching) return `Laster inn ${translatedProp}...`;
            return `Finner ingen ${translatedProp}`;
        }), distinctUntilChanged())
    }
}