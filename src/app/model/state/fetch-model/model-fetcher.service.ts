import { Injectable } from '@angular/core'
import { combineLatest, Observable, of } from 'rxjs'
import { finalize, map, mergeMap, tap } from 'rxjs/operators'
import { ApiService } from 'src/app/core/services/api.service'
import { QueryDispatcher } from 'src/app/state/query-dispatcher'
import { Store } from 'src/app/state/store'
import { ModelConfig, ModelStateConfig } from '../../model-state.config'
import { SetFetchedStateActionId, SetFetchedStateCommand } from './set-fetched-state.reducer'

type StateSlice = {[key: string]: any};

@Injectable({providedIn: "root"})
export class ModelFetcherService {

    private pendingProperties: { [key: string]: boolean } = {}

    constructor(
        private apiService: ApiService,
        queryDispatcher: QueryDispatcher,
        store: Store<any>,
    ){
        queryDispatcher.queries$.pipe(
            mergeMap(x => {
                if(!x.props?.length) return of(null);
                
                const fetchers: Observable<StateSlice>[] = [];
                const state: Readonly<Object> = store.select(null, false);

                for(const prop of x.props){
                    if(state[prop] || this.pendingProperties[prop]) continue;
                    const modelCfg = ModelStateConfig.get(prop as any);
                    if(this.isFetchable(modelCfg))          
                        fetchers.push(this.getFetcher$(modelCfg, prop))     
                }  
               
                if(!fetchers.length) return of(null);

                return combineLatest(fetchers)     
            }),
            tap(stateSlices => stateSlices ? store.dispatch(<SetFetchedStateCommand>{ 
                actionId: SetFetchedStateActionId, 
                state: this.mergeSlices(stateSlices)
            }) : null)
        ).subscribe();
    }

    private getFetcher$(modelCfg: ModelConfig<any>, prop: string): Observable<StateSlice>{
        this.pendingProperties[prop] = true;
        return this.apiService.get(modelCfg.apiUrl).pipe(
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

    private isFetchable = (modelConfig: ModelConfig<any>): boolean => 
      modelConfig && modelConfig.apiUrl && modelConfig.autoFetch
}