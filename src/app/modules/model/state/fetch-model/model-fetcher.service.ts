import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { BASE_API_URL } from '@http/injection-tokens.const'
import { Immutable } from '@immutable/interfaces'
import { QueryDispatcher } from '@state/query-dispatcher'
import { Store } from '@state/store'
import { combineLatest, Observable, of } from 'rxjs'
import { finalize, map, mergeMap, tap } from 'rxjs/operators'
import { ModelConfig } from '../../interfaces'
import { ModelStateConfig } from '../../model-state.config'
import { SetFetchedStateAction } from './set-fetched-state.reducer'

type StateSlice = {[key: string]: any};

@Injectable({providedIn: "root"})
export class ModelFetcherService {

    private pendingProperties: { [key: string]: boolean } = {}

    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_API_URL) private baseUrl: string,
        queryDispatcher: QueryDispatcher,
        store: Store<any>,
    ){
        queryDispatcher.queries$.pipe(
            mergeMap(x => {
                if(!x.props?.length) return of(null);
                
                const fetchers: Observable<StateSlice>[] = [];
                const state = store.select(null);

                for(const prop of x.props){
                    if(state[prop] || this.pendingProperties[prop]) continue;
                    const modelCfg = ModelStateConfig.get(prop);
                    if(this.isFetchable(modelCfg))          
                        fetchers.push(this.getFetcher$(modelCfg, prop))     
                }  
               
                if(!fetchers.length) return of(null);

                return combineLatest(fetchers)     
            }),
            tap(stateSlices => stateSlices ? 
                store.dispatch(new SetFetchedStateAction(this.mergeSlices(stateSlices))) : null)
        ).subscribe();
    }

    private getFetcher$(modelCfg: Immutable<ModelConfig<any, any>>, prop: string): Observable<StateSlice>{
        this.pendingProperties[prop] = true;
        return this.httpClient.get(this.baseUrl + modelCfg.apiUrl).pipe(
            map(data => {
                const slice = {};
                slice[prop] = data;
                return slice;
            }),
            finalize(() => this.pendingProperties[prop] = false)
        )
    }

    private mergeSlices(slices: StateSlice[]): StateSlice {
        let state = {};
        for(const slice of slices) state = {...state, ...slice};
        return state;
    }

    private isFetchable = (modelConfig: Immutable<ModelConfig<any, any>>): boolean => 
      modelConfig && modelConfig.apiUrl && modelConfig.autoFetch
}