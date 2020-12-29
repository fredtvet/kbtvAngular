import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Immutable, UnknownState } from 'global-types'
import { BASE_API_URL } from 'optimistic-http'
import { merge, Observable } from 'rxjs'
import { finalize, map, mergeMap } from 'rxjs/operators'
import { DispatchedAction, Effect, listenTo } from 'state-management'
import { ModelConfig } from '../../interfaces'
import { ModelStateConfig } from '../../model-state.config'
import { FetchModelsAction } from './fetch-models.action'
import { SetFetchedModelAction } from './set-fetched-model.reducer'

@Injectable()
export class FetchModelsHttpEffect implements Effect<FetchModelsAction<{}>> {

    private static pendingProperties: { [key: string]: boolean } = {}

    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_API_URL) private baseUrl: string,
    ){ }

    handle$(actions$: Observable<DispatchedAction<FetchModelsAction<{}>, UnknownState>>) {
        return actions$.pipe(
            listenTo([FetchModelsAction]),
            mergeMap(({action, stateSnapshot}) => {
                const fetchers: Observable<SetFetchedModelAction>[] = []; 
                for(const prop of action.props){
                    if(stateSnapshot[prop] || FetchModelsHttpEffect.pendingProperties[prop]) continue;

                    const modelCfg = ModelStateConfig.get(prop);
                    if(!this.isFetchable(modelCfg)) continue;
                    
                    fetchers.push(this.getFetcher$(modelCfg, prop).pipe(map(payload => { 
                        return <SetFetchedModelAction>{type: SetFetchedModelAction, payload, stateProp: prop}
                    })))
                }
                return merge(...fetchers);
            })
        )
    }

    private getFetcher$(modelCfg: Immutable<ModelConfig<UnknownState, UnknownState>>, prop: string): Observable<unknown[]>{
        FetchModelsHttpEffect.pendingProperties[prop] = true;
        return this.httpClient.get<unknown[]>(this.baseUrl + modelCfg.apiUrl).pipe(
            finalize(() => FetchModelsHttpEffect.pendingProperties[prop] = false)
        )
    }

    private isFetchable = (modelConfig: Immutable<ModelConfig<Object, {[key:string]:{}}>>): boolean => 
      modelConfig != null && modelConfig.apiUrl != null && modelConfig.autoFetch != null
}