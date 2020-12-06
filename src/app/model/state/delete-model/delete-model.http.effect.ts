import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from 'src/app/core/models';
import { HttpRequest } from 'src/app/core/services/http/interfaces';
import { HttpActionId, HttpCommand } from 'src/app/core/services/http/state/http.effect';
import { translations } from 'src/app/shared/translations';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
import { DispatchedAction } from '../../../state/action-dispatcher';
import { ModelConfig, ModelStateConfig } from '../../model-state.config';
import { DeleteModelActionId, DeleteModelStateCommand } from './delete-model-action.const';

@Injectable()
export class DeleteModelHttpEffect implements Effect<DeleteModelStateCommand>{

    constructor(){ }

    handle$(actions$: Observable<DispatchedAction<DeleteModelStateCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([DeleteModelActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}),  
        )
    }

    private createHttpRequest(command: DeleteModelStateCommand): HttpRequest {
        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);

        return {
            apiUrl: this.createApiUrl(command, modelConfig),
            body: this.createHttpBody(command),
            method: this.createHttpMethod(command),
            cancelMessage: this.createCancelMessage(command, modelConfig)
        }
    }

    protected createCancelMessage(command: DeleteModelStateCommand, modelConfig: ModelConfig<Model>): string{
        const multi = command.ids?.length > 1;

        const entityWord = 
            translations[(multi ? command.stateProp : modelConfig.foreignProp).toLowerCase()];
        
        return `Sletting av ${command.ids?.length || ''} ${entityWord} med id ${command.ids || command.id} er reversert!`;
    }
  
    protected createHttpBody(command: DeleteModelStateCommand): {ids: any[]} {
        return command.id ? null : {ids: command.ids};
    }

    protected createApiUrl(command: DeleteModelStateCommand, modelConfig: ModelConfig<Model>): string {
        const endUri = command.id ? `/${command.id}` : "/DeleteRange";
        return modelConfig.apiUrl + endUri;
    }

    protected createHttpMethod(command: DeleteModelStateCommand): "DELETE" | "POST" {
        return command.id ? "DELETE" : "POST";
    }

}