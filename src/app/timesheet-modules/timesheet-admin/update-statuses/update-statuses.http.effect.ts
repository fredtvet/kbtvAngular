import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { HttpCommandHandler } from 'src/app/core/services/http/http-command.handler';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { UpdateStatusesAction, UpdateStatusesStateCommand } from './update-statuses-state-command.interface';

@Injectable({providedIn: 'root'})
export class UpdateStatusesHttpEffect {

    constructor(
        private commandDispatcher: CommandDispatcher,
        private httpCommandHandler: HttpCommandHandler,
    ){  
        this.initCommandListener();   
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<UpdateStatusesStateCommand>(UpdateStatusesAction)
            .subscribe(res => this.handle(res.command, res.state))
    }

    protected handle(command: UpdateStatusesStateCommand, stateSnapshot: any): void{
        this.httpCommandHandler.handle({
            httpMethod: "PUT", 
            httpBody: {ids: command.ids, status: command.status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`,
            cancelMessage: "Oppdatering av timestatuser er reversert"
        }, stateSnapshot)
    }

}