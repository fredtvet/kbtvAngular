import { Injectable } from '@angular/core';
import { HttpCommandHandler } from '../../../http/http-command.handler';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { MailApiUrlMap } from './mail-api-url.map';
import { MailModelsAction, MailModelsStateCommand } from './mail-models-state-command.interface';

@Injectable({providedIn: 'root'})
export class MailModelsHttpEffect {

    constructor(
        protected commandDispatcher: CommandDispatcher,
        private httpCommandHandler: HttpCommandHandler,
    ){  
        this.initCommandListener();   
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<MailModelsStateCommand>(MailModelsAction)
            .subscribe(res => this.handle(res.command))
    }

    protected handle(command: MailModelsStateCommand): void{
        const apiUrl = MailApiUrlMap[command.stateProp];
        if(!apiUrl) return console.error('No api url for property', command.stateProp);
        this.httpCommandHandler.handle({
            apiUrl,
            httpBody: {ids: command.ids, toEmail: command.toEmail},
            httpMethod: "POST",
        })
    }

}