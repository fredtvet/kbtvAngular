import { DeleteModelStateCommand } from 'src/app/core/model/interfaces';
import { ModelToStateHttpConverter } from 'src/app/core/model/abstracts/model-to-state-http.converter';
import { DeleteModelWithChildrenHelper } from 'src/app/core/model/state-helpers/delete-model-with-children.helper';
import { StateHttpConverter } from 'src/app/core/state/state-http-converter';

export abstract class BaseDeleteModelToStateHttpConverter<TState, TCommand extends DeleteModelStateCommand>  
    extends ModelToStateHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

    constructor(private deleteModelWithChildrenHelper: DeleteModelWithChildrenHelper){ super(); }

   protected setupCommand(command: TCommand): TCommand {     
       if(!command.id && (!command.ids || command.ids.length === 0)) throw "Id(s) required to delete entities";
       return command;
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

   protected modifyState(state: TState, command: TCommand): Partial<TState>{  
        return this.deleteModelWithChildrenHelper.delete(state, command.stateProp as keyof TState, command)    
   }
}