import { Injectable } from '@angular/core';
import { translations } from 'src/app/shared/translations';
import { HttpCommandHandler } from '../../../http/http-command.handler';
import { ObservableStore } from '../../../state/abstracts/observable-store';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { ObservableStoreBase } from '../../../state/observable-store-base';
import { ModelConfig, ModelStateConfig } from '../../model-state.config';
import { DeleteModelAction, DeleteModelStateCommand } from './delete-model-state-command.interface';

@Injectable({providedIn: 'root'})
export class DeleteModelHttpEffect extends ObservableStore<any>{

    constructor(
        base: ObservableStoreBase,
        commandDispatcher: CommandDispatcher,
        private httpCommandHandler: HttpCommandHandler,
    ){ 
        super(base);
        
        commandDispatcher.listen$<DeleteModelStateCommand>(DeleteModelAction)
            .subscribe(res => this.handle(res.command, res.state))
    }

    private handle(command: DeleteModelStateCommand, stateSnapshot: any): void{
        if(!command.id && (!command.ids || command.ids.length === 0)) console.error("Id(s) required to delete entities");

        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);

        this.httpCommandHandler.handle({
            apiUrl: this.createApiUrl(command, modelConfig),
            httpBody: this.createHttpBody(command),
            httpMethod: this.createHttpMethod(command),
            cancelMessage: this.createCancelMessage(command, modelConfig)
        }, stateSnapshot)
    }


    protected createCancelMessage(command: DeleteModelStateCommand, modelConfig: ModelConfig): string{
        const multi = command.ids?.length > 1;

        const entityWord = 
            translations[(multi ? command.stateProp : modelConfig.foreignProp).toLowerCase()];
        
        return `Sletting av ${command.ids?.length || ''} ${entityWord} med id ${command.ids || command.id} er reversert!`;
    }
  
    protected createHttpBody(command: DeleteModelStateCommand): {ids: any[]} {
        return command.id ? null : {ids: command.ids};
    }

    protected createApiUrl(command: DeleteModelStateCommand, modelConfig: ModelConfig): string {
        const identfifier = modelConfig.identifier;
        let endUri = command.id ? `/${command[identfifier]}` : "/DeleteRange";
        return modelConfig.apiUrl + endUri;
    }

    protected createHttpMethod(command: DeleteModelStateCommand): "DELETE" | "POST" {
        return command.id ? "DELETE" : "POST";
    }

}