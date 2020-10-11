import { Injectable } from '@angular/core';
import { Model } from 'src/app/core/models';
import { translations } from 'src/app/shared/translations';
import { HttpCommandHandler } from '../../../http/http-command.handler';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { StateAction } from '../../../state/state-action.enum';
import { ModelConfig, ModelStateConfig } from '../../model-state.config';
import { SaveModelAction, SaveModelStateCommand } from './save-model-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveModelHttpEffect {

    constructor(
        protected commandDispatcher: CommandDispatcher,
        private httpCommandHandler: HttpCommandHandler,
    ){  
        this.initCommandListener();   
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveModelStateCommand<Model>>(SaveModelAction)
            .subscribe(res => this.handle(res.command, res.state))
    }

    protected handle(command: SaveModelStateCommand<Model>, stateSnapshot: any): void{
        if(!command.entity) console.error("No entity provided");

        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);

        this.httpCommandHandler.handle({
            apiUrl: command.apiUrlOverride || this.createApiUrl(command, modelConfig),
            httpBody: this.createHttpBody(command),
            httpMethod: this.createHttpMethod(command),
            cancelMessage: this.createCancelMessage(command, modelConfig)
        }, stateSnapshot)
    }

    protected createCancelMessage(command: SaveModelStateCommand<Model>, modelConfig: ModelConfig): string{
        const saveWord = command.saveAction === StateAction.Update ? "Oppdatering" : "Oppretting";
        const entityWord = translations[modelConfig.foreignProp].toLowerCase();
        const displayPropWord = translations[modelConfig.displayProp].toLowerCase();
        const displayPropValue = command.entity[modelConfig.displayProp];
        return `${saveWord} av ${entityWord} med ${displayPropWord} ${displayPropValue} er reversert!`;
    }
  
    protected createHttpBody(command: SaveModelStateCommand<Model>): any {
        return command.entity;
    }

    protected createApiUrl(command: SaveModelStateCommand<Model>, modelConfig: ModelConfig): string {
        const identfifier = modelConfig.identifier;
        const endUri = (command.saveAction === StateAction.Update) ? `/${command.entity[identfifier]}` : "";
        return modelConfig.apiUrl + endUri;
    }

    protected createHttpMethod(command: SaveModelStateCommand<Model>): "PUT" | "POST" {
        return  command.saveAction === StateAction.Update ? "PUT" : "POST";
    }

}