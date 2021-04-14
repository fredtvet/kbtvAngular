import { Inject, Injectable } from '@angular/core';
import { Immutable, Prop } from 'global-types';
import { OptimisticHttpAction, OptimisticHttpRequest } from 'optimistic-http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { MODEL_COMMAND_API_MAP } from '../../injection-tokens.const';
import { ModelCommandApiMap, ModelConfig } from '../../interfaces';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelAction } from './save-model.action';

@Injectable()
export class SaveModelHttpEffect<TModel extends {}, TState extends {}> implements Effect<SaveModelAction<TModel, TState>> {
    protected type: string = SaveModelAction
    
    constructor(@Inject(MODEL_COMMAND_API_MAP) private apiMap: ModelCommandApiMap){ }

    handle$(actions$: Observable<DispatchedAction<SaveModelAction<TModel, TState>>>): Observable<OptimisticHttpAction> {
        return actions$.pipe(
            listenTo([this.type]),
            map(x => <OptimisticHttpAction>{ 
                type: OptimisticHttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot 
            }),
        )
    }

    protected createHttpRequest(action: Immutable<SaveModelAction<TModel, TState>>): OptimisticHttpRequest {
        const modelConfig = ModelStateConfig.get<TModel, TState>(action.stateProp);
        if(!modelConfig) console.error(`No model config for property ${action.stateProp}`);

        return {
            apiUrl: action.apiUrlOverride || this.createApiUrl(action, modelConfig),
            body: this.createHttpBody(action),
            method: this.apiMap[action.saveAction].method,
            callerAction: action
        }
    }

    protected createHttpBody(action: Immutable<SaveModelAction<TModel, TState>>): {} {
        return action.entity;
    }

    protected createApiUrl(
        action: Immutable<SaveModelAction<TModel, TState>>, 
        modelConfig: Immutable<ModelConfig<TModel, TState>>
    ): string {
        const suffix = this.apiMap[action.saveAction].suffix;
        if(typeof suffix === "string") return modelConfig.apiUrl + suffix;
        else{ 
            const id = action.entity[<Prop<Immutable<TModel>>> modelConfig.idProp]
            return modelConfig.apiUrl + suffix(id);
        }
    }

}