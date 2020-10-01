import { Injectable } from '@angular/core';
import { ModelFileWrapper } from 'src/app/core/services/model/model-file.wrapper';
import { ModelFile } from 'src/app/core/models';
import { ModelIdGeneratorService } from '../model-id-generator.service';
import { SaveModelToStateHttpConverter } from './save-model-to-state-http.converter';
import { StateHttpConverter } from '../../state/state-http-converter/state-http-converter.interface';
import { SaveModelWithFileStateCommand } from '../interfaces/save-model-with-file-state-command.interface';
import { ModifyModelWithForeignsHelper } from '../state-helpers/modify-model-with-foreigns.helper';

@Injectable({providedIn: 'root'})
export class SaveModelFileToStateHttpConverter<TState, TCommand extends SaveModelWithFileStateCommand<ModelFile>>  
    extends SaveModelToStateHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

    constructor(
        modelIdGenerator: ModelIdGeneratorService,
        modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
    ){ super(modelIdGenerator, modifyModelWithForeignsHelper); }

    protected cloneInput(command: TCommand): TCommand{
        const file = command.file; //Ignore cloning file
        const cloned = super.cloneInput(command);
        cloned.file = file;
        return cloned;
    }

    protected setupCommand(command: TCommand): TCommand {
        command = super.setupCommand(command);
        var fileId = Math.floor(Math.random() * 100).toString() + command.entity.id;
        command.file = new ModelFileWrapper(command.file, fileId).modifiedFile;
        return command;
    }

    protected createHttpBody(command: TCommand): FormData {
        const httpBody: FormData = new FormData();   
        if(command.file) httpBody.append("files", command.file, command.file.name);
        httpBody.append("command", JSON.stringify(command.entity));
        return httpBody;
    }

    protected modifyState(state: TState, command: TCommand):  Partial<TState>{   
        command.entity = {
            ...command.entity, 
            fileName: command.file.name,
            temp_localFileUrl: URL.createObjectURL(command.file)
        };      
        return super.modifyState(state, command);    
    }
}