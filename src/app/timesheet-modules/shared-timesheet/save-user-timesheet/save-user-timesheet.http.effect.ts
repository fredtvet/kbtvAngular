import { Injectable } from '@angular/core';
import { HttpCommandHandler } from 'src/app/core/services/http/http-command.handler';
import { SaveModelHttpEffect } from 'src/app/core/services/model/state/save-model/save-model.http.effect';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { SaveUserTimesheetAction, SaveUserTimesheetStateCommand } from './save-user-timesheet-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveUserTimesheetHttpEffect extends SaveModelHttpEffect {

    constructor(
        commandDispatcher: CommandDispatcher,
        httpCommandHandler: HttpCommandHandler,
    ){  
        super(commandDispatcher, httpCommandHandler)
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveUserTimesheetStateCommand>(SaveUserTimesheetAction)
            .subscribe(res => this.handle(res.command, res.state))
    }

}