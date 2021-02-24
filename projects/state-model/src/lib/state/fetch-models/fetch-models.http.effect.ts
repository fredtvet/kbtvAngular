import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Immutable, UnknownState } from 'global-types'
import { BASE_API_URL } from 'optimistic-http'
import { merge, Observable, of } from 'rxjs'
import { finalize, map, mergeMap } from 'rxjs/operators'
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management'
import { ModelConfig, StateIsFetching, UnknownModelState } from '../../interfaces'
import { ModelStateConfig } from '../../model-state.config'
import { FetchModelsAction } from './fetch-models.action'
import { SetFetchedModelAction } from './set-fetched-model.reducer'
import { SetFetchingModelStatusAction } from './set-fetching-model-status.reducer'

@Injectable()
export class FetchModelsHttpEffect implements Effect<FetchModelsAction<{}>> {

    private static pendingProperties: { [key: string]: boolean } = {}

    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_API_URL) private baseUrl: string,
    ){ }

    handle$(actions$: Observable<DispatchedAction<FetchModelsAction<{}>, StateIsFetching<UnknownModelState>>>) {
        return actions$.pipe(
            listenTo([FetchModelsAction]),
            mergeMap(({action, stateSnapshot}) => {
                const fetchers: Observable<StateAction>[] = []; 

                const setFetchingStatusAction: SetFetchingModelStatusAction = {
                    type: SetFetchingModelStatusAction,
                    isFetching: {}
                }

                for(const prop of action.props){
                    if(stateSnapshot[prop] || (stateSnapshot.isFetching && stateSnapshot.isFetching[prop])) continue;

                    const modelCfg = ModelStateConfig.get(prop);
                    if(!this.isFetchable(modelCfg)) continue;

                    setFetchingStatusAction.isFetching[prop] = true;

                    fetchers.push(this.fetch$(modelCfg, prop).pipe(map(payload => { 
                        return <SetFetchedModelAction>{type: SetFetchedModelAction, payload, stateProp: prop}
                    })))
                }
 
                return merge(of(setFetchingStatusAction), ...fetchers);
            })
        )
    }

    private fetch$(modelCfg: Immutable<ModelConfig<UnknownState, UnknownState>>, prop: string): Observable<unknown[]>{
        return this.httpClient.get<unknown[]>(this.baseUrl + modelCfg.apiUrl).pipe(
            finalize(() => FetchModelsHttpEffect.pendingProperties[prop] = false)
        )
    }

    private isFetchable = (modelConfig: Immutable<ModelConfig<Object, {[key:string]:{}}>>): boolean => 
      modelConfig != null && modelConfig.apiUrl != null && modelConfig.fetchable != null
}