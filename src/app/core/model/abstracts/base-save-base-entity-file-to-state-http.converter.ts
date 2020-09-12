import { ModelFile } from 'src/app/core/models';
import { SaveModelWithFileStateCommand } from 'src/app/core/model/interfaces';
import { BaseSaveModelToStateHttpConverter } from './base-save-base-entity-to-state-http.converter';
import { StateHttpConverter } from 'src/app/core/state/state-http-converter';
import { ModelFileWrapper } from 'src/app/core/model/model-file.wrapper';
import { ModifyModelWithForeignsHelper } from 'src/app/core/model/state-helpers/modify-model-with-foreigns.helper';
import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { ModelIdGeneratorService } from '../../services/model/model-id-generator.service';

export abstract class BaseSaveModelFileToStateHttpConverter<TState, TModel extends ModelFile, TCommand extends SaveModelWithFileStateCommand<TModel>>  
     extends BaseSaveModelToStateHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

     constructor(
         arrayHelperService: ArrayHelperService,
         modelIdGenerator: ModelIdGeneratorService,
         modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
     ){ super(arrayHelperService, modelIdGenerator, modifyModelWithForeignsHelper); }


    protected setupCommand(command: TCommand): TCommand {
        command = super.setupCommand(command);
        command.file = new ModelFileWrapper(command.file, command.entity.id).modifiedFile;
        return command;
    }

    protected createHttpBody(command: TCommand): FormData {
        const httpBody: FormData = new FormData(); 
        if(command.file) httpBody.append("files", command.file, command.file.name);
        httpBody.append("command", JSON.stringify(command.entity));
        return httpBody;
     }
 
    protected modifyState(state: TState, command: TCommand):  Partial<TState>{   
         command.entity = {...command.entity, fileUri: command.file.name};      
         return super.modifyState(state, command);    
    }

}