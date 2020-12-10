import { Inject, Injectable } from '@angular/core';
import { HttpRequest } from '@http/interfaces';
import { HttpActionId, HttpCommand } from '@http/state/http.effect';
import { DispatchedAction, Effect, StateAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COMMAND_API_MAP, MODEL_PROP_TRANSLATIONS } from '../../injection-tokens.const';
import { CommandApiMap, KeyVal, ModelConfig } from '../../interfaces';
import { ModelCommand } from '../../model-command.enum';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelActionId, SaveModelStateCommand } from './save-model-action.const';

@Injectable()
export class SaveModelHttpEffect implements Effect<SaveModelStateCommand<any, any>> {

    constructor(
        @Inject(COMMAND_API_MAP) private apiMap: CommandApiMap,
        @Inject(MODEL_PROP_TRANSLATIONS) private translations: Readonly<KeyVal<string>>
    ){ }

    handle$(actions$: Observable<DispatchedAction<SaveModelStateCommand<any, any>>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SaveModelActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}), 
        )
    }

    protected createHttpRequest(command: SaveModelStateCommand<any, any>): HttpRequest{
        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);

        return {
            apiUrl: command.apiUrlOverride || this.createApiUrl(command, modelConfig),
            body: this.createHttpBody(command),
            method: this.apiMap[command.saveAction].method,
            cancelMessage: this.createCancelMessage(command, modelConfig)
        }
    }

    protected createCancelMessage(command: SaveModelStateCommand<any, any>, modelConfig: ModelConfig<any, any>): string{
        const saveWord = command.saveAction === ModelCommand.Update ? "Oppdatering" : "Oppretting";
        const entityWord = this.translations[modelConfig.foreignProp?.toLowerCase()].toLowerCase();
        const displayPropWord = this.translations[modelConfig.displayProp?.toLowerCase()].toLowerCase();
        const displayPropValue = command.entity[modelConfig.displayProp];
        return `${saveWord} av ${entityWord} med ${displayPropWord} ${displayPropValue} er reversert!`;
    }
  
    protected createHttpBody(command: SaveModelStateCommand<any, any>): any {
        return command.entity;
    }

    protected createApiUrl(command: SaveModelStateCommand<any, any>, modelConfig: ModelConfig<any, any>): string {
        const suffix = this.apiMap[command.saveAction].suffix;
        if(typeof suffix === "string") return modelConfig.apiUrl + suffix;
        else{ 
            const id = command.entity[modelConfig.identifier]
            return modelConfig.apiUrl + suffix(id);
        }
    }

}