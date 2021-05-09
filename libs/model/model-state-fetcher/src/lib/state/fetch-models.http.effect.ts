import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, Optional } from '@angular/core'
import { Immutable } from 'global-types'
import { UnknownModelState, _getModelConfig } from 'model/core'
import { merge, Observable, of } from 'rxjs'
import { finalize, map, mergeMap } from 'rxjs/operators'
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management'
import { FetchModelsAction } from '../fetch-models.action'
import { MODEL_FETCHER_BASE_URL } from '../injection-tokens.const'
import { ModelFetcherConfig, StateIsFetching } from '../interfaces'
import { SetFetchedModelAction } from './set-fetched-model.reducer'
import { SetFetchingModelStatusAction } from './set-fetching-model-status.reducer'

@Injectable()
export class FetchModelsHttpEffect implements Effect<FetchModelsAction<{}>> {

    private static pendingProperties: { [key: string]: boolean } = {}

    constructor(
        private httpClient: HttpClient,
        @Optional() @Inject(MODEL_FETCHER_BASE_URL) private baseUrl: string,
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

                    const modelCfg = _getModelConfig<any,any, ModelFetcherConfig>(prop);
                    if(!this.isFetchable(modelCfg)) continue;

                    setFetchingStatusAction.isFetching[prop] = true;

                    fetchers.push(this.fetch$(modelCfg, prop).pipe(map(payload => { 
                        return <SetFetchedModelAction>{type: SetFetchedModelAction, payload, stateProp: prop}
                    })))
                }
                if(fetchers.length) return merge(of(setFetchingStatusAction), ...fetchers)
                return merge(...fetchers);
            })
        )
    }

    private fetch$(modelCfg: Immutable<ModelFetcherConfig>, prop: string): Observable<unknown[]>{
        return this.httpClient.get<unknown[]>((this.baseUrl || "") + modelCfg.fetchUrl).pipe(
            finalize(() => FetchModelsHttpEffect.pendingProperties[prop] = false)
        )
    }

    private isFetchable = (modelConfig: Immutable<ModelFetcherConfig>): boolean => 
      modelConfig != null && modelConfig.fetchUrl != null
}