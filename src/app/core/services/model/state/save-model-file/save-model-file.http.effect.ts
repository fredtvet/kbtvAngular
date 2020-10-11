import { Injectable } from '@angular/core';
import { ModelFile } from 'src/app/core/models';
import { HttpCommandHandler } from '../../../http/http-command.handler';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { SaveModelHttpEffect } from '../save-model/save-model.http.effect';
import { SaveModelFileAction, SaveModelFileStateCommand } from './save-model-file-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveModelFileHttpEffect extends SaveModelHttpEffect {

    constructor(
        commandDispatcher: CommandDispatcher,
        httpCommandHandler: HttpCommandHandler,
    ){     
        super(commandDispatcher, httpCommandHandler) 
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveModelFileStateCommand<ModelFile>>(SaveModelFileAction)
            .subscribe(res => this.handle(res.command, res.state))
    }

    protected createHttpBody(command: SaveModelFileStateCommand<ModelFile>): FormData {
        const httpBody: FormData = new FormData();   
        const file = command.fileWrapper.modifiedFile;
        if(file) httpBody.append("files", file, file.name);
        httpBody.append("command", JSON.stringify(command.entity));
        return httpBody;
    }

}