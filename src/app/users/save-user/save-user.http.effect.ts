import { Injectable } from '@angular/core';
import { HttpCommandHandler } from 'src/app/core/services/http/http-command.handler';
import { SaveModelHttpEffect } from 'src/app/core/services/model/state/save-model/save-model.http.effect';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { SaveUserAction, SaveUserStateCommand } from './save-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveUserHttpEffect extends SaveModelHttpEffect {

    constructor(
        commandDispatcher: CommandDispatcher,
        httpCommandHandler: HttpCommandHandler,
    ){  
        super(commandDispatcher, httpCommandHandler)
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveUserStateCommand>(SaveUserAction)
            .subscribe(res => this.handle(res.command, res.state))
    }

    protected createHttpBody(command: SaveUserStateCommand): any {
        if(command.saveAction === StateAction.Update) return command.entity;
        return {...command.entity, password: command.password};
    }

}