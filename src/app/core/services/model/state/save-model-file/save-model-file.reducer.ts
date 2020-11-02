import { Injectable } from '@angular/core';
import { ModelFile } from '../../../../models';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { ModelConfig } from '../../model-state.config';
import { ModifyModelWithForeignsHelper } from '../../state-helpers/modify-model-with-foreigns.helper';
import { SaveModelReducer } from '../save-model/save-model.reducer';
import { SaveModelFileAction, SaveModelFileStateCommand } from './save-model-file-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveModelFileReducer extends SaveModelReducer{

    constructor( 
        commandDispatcher: CommandDispatcher,
        modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
    ){ 
        super(commandDispatcher, modifyModelWithForeignsHelper);
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveModelFileStateCommand<ModelFile>>(SaveModelFileAction)
            .subscribe(res => this.handle(res.command))
    }

    protected modifyState(state: any, command: SaveModelFileStateCommand<ModelFile>, modelConfig: ModelConfig): Partial<any>{  
        command.entity = {
            ...command.entity, 
            fileName: command.fileWrapper?.modifiedFile?.name,
            temp_localFileUrl: URL.createObjectURL(command.fileWrapper?.modifiedFile)
        };  
            
        return super.modifyState(state, command, modelConfig);  
    }
    
}