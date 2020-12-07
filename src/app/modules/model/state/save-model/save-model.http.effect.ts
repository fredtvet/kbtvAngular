import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from '@core/models';
import { HttpRequest } from '@http/interfaces';
import { HttpActionId, HttpCommand } from '@http/state/http.effect';
import { ActionType } from '@shared-app/enums';
import { translations } from '@shared/translations';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { DispatchedAction } from '../../../state/action-dispatcher';
import { ModelConfig, ModelStateConfig } from '../../model-state.config';
import { SaveModelActionId, SaveModelStateCommand } from './save-model-action.const';

@Injectable()
export class SaveModelHttpEffect implements Effect<SaveModelStateCommand<Model>> {

    constructor(){ }

    handle$(actions$: Observable<DispatchedAction<SaveModelStateCommand<Model>>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([SaveModelActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot
            }}), 
        )
    }

    protected createHttpRequest(command: SaveModelStateCommand<Model>): HttpRequest{
        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);

        return {
            apiUrl: command.apiUrlOverride || this.createApiUrl(command, modelConfig),
            body: this.createHttpBody(command),
            method: this.createHttpMethod(command),
            cancelMessage: this.createCancelMessage(command, modelConfig)
        }
    }

    protected createCancelMessage(command: SaveModelStateCommand<Model>, modelConfig: ModelConfig<Model>): string{
        const saveWord = command.saveAction === ActionType.Update ? "Oppdatering" : "Oppretting";
        const entityWord = translations[modelConfig.foreignProp?.toLowerCase()].toLowerCase();
        const displayPropWord = translations[modelConfig.displayProp?.toLowerCase()].toLowerCase();
        const displayPropValue = command.entity[modelConfig.displayProp];
        return `${saveWord} av ${entityWord} med ${displayPropWord} ${displayPropValue} er reversert!`;
    }
  
    protected createHttpBody(command: SaveModelStateCommand<Model>): any {
        return command.entity;
    }

    protected createApiUrl(command: SaveModelStateCommand<Model>, modelConfig: ModelConfig<Model>): string {
        const identfifier = modelConfig.identifier;
        const endUri = (command.saveAction === ActionType.Update) ? `/${command.entity[identfifier]}` : "";
        return modelConfig.apiUrl + endUri;
    }

    protected createHttpMethod(command: SaveModelStateCommand<Model>): "PUT" | "POST" {
        return  command.saveAction === ActionType.Update ? "PUT" : "POST";
    }

}