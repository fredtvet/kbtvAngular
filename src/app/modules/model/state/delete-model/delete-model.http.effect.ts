import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpRequest } from '@http/interfaces';
import { HttpActionId, HttpCommand } from '@http/state/http.effect';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { DispatchedAction } from '../../../state/action-dispatcher';
import { ModelStateConfig } from '../../model-state.config';
import { DeleteModelActionId, DeleteModelStateCommand } from './delete-model-action.const';
import { CommandApiMap, KeyVal, ModelConfig } from '../../interfaces';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '../../injection-tokens.const';
import { ModelCommand } from '../../model-command.enum';

@Injectable()
export class DeleteModelHttpEffect implements Effect<DeleteModelStateCommand<any>>{

    constructor(
        @Inject(COMMAND_API_MAP) private apiMap: CommandApiMap,    
        @Inject(MODEL_PROP_TRANSLATIONS) private translations: Readonly<KeyVal<string>>
    ){ }

    handle$(actions$: Observable<DispatchedAction<DeleteModelStateCommand<any>>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([DeleteModelActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}),  
        )
    }

    private createHttpRequest(command: DeleteModelStateCommand<any>): HttpRequest {
        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);
        const modelCommand = command.id ? ModelCommand.Delete : ModelCommand.DeleteRange;
        return {
            apiUrl: this.createApiUrl(command, modelConfig, modelCommand),
            body: this.createHttpBody(command),
            method: this.apiMap[modelCommand].method,
            cancelMessage: this.createCancelMessage(command, modelConfig)
        }
    }

    protected createCancelMessage(command: DeleteModelStateCommand<any>, modelConfig: ModelConfig<any, any>): string{
        const multi = command.ids?.length > 1;

        const entityWord = 
            this.translations[(multi ? command.stateProp : modelConfig.foreignProp).toLowerCase()];
        
        return `Sletting av ${command.ids?.length || ''} ${entityWord} med id ${command.ids || command.id} er reversert!`;
    }
  
    protected createHttpBody(command: DeleteModelStateCommand<any>): {ids: any[]} {
        return command.id ? null : {ids: command.ids};
    }

    protected createApiUrl(command: DeleteModelStateCommand<any>, modelConfig: ModelConfig<any, any>, commandType: ModelCommand): string {
        const suffix = this.apiMap[commandType].suffix;
        if(typeof suffix === "string") return modelConfig.apiUrl + suffix
        return modelConfig.apiUrl + suffix(command.id)
    }

}