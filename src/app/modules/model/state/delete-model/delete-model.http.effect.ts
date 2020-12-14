import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpRequest } from '@http/interfaces';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { ModelStateConfig } from '../../model-state.config';
import { CommandApiMap, KeyVal, ModelConfig } from '../../interfaces';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '../../injection-tokens.const';
import { DeleteModelAction } from './delete-model.action';
import { HttpAction } from '@http/state/http.effect';
import { ModelCommand } from '@model/model-command.enum';
import { Immutable } from '@immutable/interfaces';

@Injectable()
export class DeleteModelHttpEffect implements Effect<DeleteModelAction<any>>{

    constructor(
        @Inject(COMMAND_API_MAP) private apiMap: CommandApiMap,    
        @Inject(MODEL_PROP_TRANSLATIONS) private translations: Readonly<KeyVal<string>>
    ){ }

    handle$(actions$: Observable<DispatchedAction<DeleteModelAction<any>>>): Observable<HttpAction> {
        return actions$.pipe(
            listenTo([DeleteModelAction]),
            map(x => <HttpAction>{ 
                type: HttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot 
            }),  
        )
    }

    private createHttpRequest(action: DeleteModelAction<any>): HttpRequest {
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

    protected createCancelMessage(action: DeleteModelAction<any>, modelConfig: Immutable<ModelConfig<any, any>>): string{
        const payload = action.payload;
        const multi = payload.ids?.length > 1;

        const entityWord = 
            this.translations[(multi ? action.stateProp : modelConfig.foreignProp).toLowerCase()];
        
        return `Sletting av ${payload.ids?.length || ''} ${entityWord} med id ${payload.ids || payload.id} er reversert!`;
    }
  
    protected createHttpBody(action: DeleteModelAction<any>): {ids: any[]} {
        return action.payload.id ? null : {ids: action.payload.ids};
    }

    protected createApiUrl(
        action: DeleteModelAction<any>, 
        modelConfig: Immutable<ModelConfig<any, any>>, 
        actionType: ModelCommand): string {
        const suffix = this.apiMap[actionType].suffix;
        if(typeof suffix === "string") return modelConfig.apiUrl + suffix
        return modelConfig.apiUrl + suffix(action.payload.id)
    }

}