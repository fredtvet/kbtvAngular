import { Injectable } from '@angular/core';
import { ModelToStateHttpConverter } from 'src/app/core/services/model/model-to-state-http.converter';
import { Prop } from 'src/app/shared-app/prop.type';
import { translations } from 'src/app/shared/translations';
import { StateHttpConverter } from '../../state/state-http-converter/state-http-converter.interface';
import { DeleteModelStateCommand } from '../interfaces/delete-model-state-command.interface';
import { DeleteModelWithChildrenHelper } from '../state-helpers/delete-model-with-children.helper';

@Injectable({providedIn: 'root'})
export class DeleteModelToStateHttpConverter<TState, TCommand extends DeleteModelStateCommand>  
    extends ModelToStateHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

    constructor(private deleteModelWithChildrenHelper: DeleteModelWithChildrenHelper){ super(); }

    protected setupCommand(command: TCommand): TCommand {     
        command = super.setupCommand(command);
        if(!command.id && (!command.ids || command.ids.length === 0)) console.error("Id(s) required to delete entities");
        return command;
    }

    protected createCancelMessage(command: TCommand): string{
        const multi = command.ids?.length > 1;

        const entityWord = 
            translations[multi ? command.stateProp : this.modelConfig.foreignProp]?.toLowerCase();
        
        return `Sletting av ${command.ids?.length || ''} ${entityWord} med id ${command.ids || command.id} er reversert!`;
    }
  
    protected createHttpBody(command: TCommand): {ids: any[]} {
        return command.id ? null : {ids: command.ids};
    }

    protected createApiUrl(command: TCommand): string {
        const identfifier = this.modelConfig.identifier;
        let endUri = command.id ? `/${command[identfifier]}` : "/DeleteRange";
        return this.modelConfig.apiUrl + endUri;
    }

    protected createHttpMethod(command: TCommand): "DELETE" | "POST" {
        return command.id ? "DELETE" : "POST";
    }

    //Include state prop and children
    protected createProperties(command: TCommand): Prop<TState>[]{
        const props: any[] = [command.stateProp];
        if(this.modelConfig.children) 
            props.push(this.modelConfig.children);

        return props;
    }

    protected modifyState(state: TState, command: TCommand): Partial<TState>{  
        return this.deleteModelWithChildrenHelper.delete(state, command.stateProp, command)    
    }
}