import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { HttpCommandHandler } from 'src/app/core/services/http/http-command.handler';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { UpdatePasswordAction, UpdatePasswordStateCommand } from './update-password-state-command.interface';

@Injectable({providedIn: 'root'})
export class UpdatePasswordHttpEffect {

    constructor(
        private commandDispatcher: CommandDispatcher,
        private httpCommandHandler: HttpCommandHandler,
    ){  
        this.initCommandListener();   
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<UpdatePasswordStateCommand>(UpdatePasswordAction)
            .subscribe(res => this.handle(res.command))
    }

    protected handle(command: UpdatePasswordStateCommand): void{
        this.httpCommandHandler.handle({
            httpMethod: "PUT", 
            httpBody: command, 
            apiUrl: `${ApiUrl.Auth}/changePassword`
        })
    }

}