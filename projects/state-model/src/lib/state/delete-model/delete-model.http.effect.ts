import { Inject, Injectable } from '@angular/core';
import { Immutable, Maybe } from 'global-types';
import { OptimisticHttpAction, OptimisticHttpRequest } from 'optimistic-http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '../../injection-tokens.const';
import { CommandApiMap, KeyVal, ModelConfig } from '../../interfaces';
import { ModelCommand } from '../../model-command.enum';
import { ModelStateConfig } from '../../model-state.config';
import { DeleteModelAction } from './delete-model.action';

@Injectable()
export class DeleteModelHttpEffect implements Effect<DeleteModelAction<unknown>>{

    constructor(
        @Inject(COMMAND_API_MAP) private apiMap: CommandApiMap,    
        @Inject(MODEL_PROP_TRANSLATIONS) private translations: Immutable<KeyVal<string>>
    ){ }

    handle$(actions$: Observable<DispatchedAction<DeleteModelAction<unknown>>>): Observable<OptimisticHttpAction> {
        return actions$.pipe(
            listenTo([DeleteModelAction]),
            map(x => <OptimisticHttpAction>{ 
                type: OptimisticHttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot 
            }),  
        )
    }

    private createHttpRequest(action: Immutable<DeleteModelAction<unknown>>): OptimisticHttpRequest {
        const modelConfig = ModelStateConfig.get(action.stateProp);
        if(!modelConfig) console.error(`No model config for property ${action.stateProp}`);
        const modelCommand = action.payload.id ? ModelCommand.Delete : ModelCommand.DeleteRange;
        return {
            apiUrl: this.createApiUrl(action, modelConfig, modelCommand),
            body: this.createHttpBody(action),
            method: this.apiMap[modelCommand].method,
            cancelMessage: this.createCancelMessage(action, modelConfig)
        }
    }

    protected createCancelMessage(action: Immutable<DeleteModelAction<unknown>>, modelConfig: Immutable<ModelConfig<unknown, unknown>>): string{
        const payload = action.payload;
        const multi = payload.ids && payload.ids.length > 1;

        const entityWord = 
            this.translations[<string> (multi ? action.stateProp : modelConfig.foreignProp)?.toLowerCase()];
        
        return `Sletting av ${payload.ids?.length || ''} ${entityWord} med id ${payload.ids || payload.id} er reversert!`;
    }
  
    protected createHttpBody(action: Immutable<DeleteModelAction<unknown>>): Maybe<Immutable<{ids: Maybe<unknown[]>}>> {
        return action.payload.id ? null : {ids: action.payload.ids};
    }

    protected createApiUrl(
        action: Immutable<DeleteModelAction<Object>>, 
        modelConfig: Immutable<ModelConfig<Object, Object>>, 
        actionType: ModelCommand): string {
        const suffix = this.apiMap[actionType].suffix;
        if(typeof suffix === "string") return modelConfig.apiUrl + suffix
        return modelConfig.apiUrl + suffix(action.payload.id)
    }

}