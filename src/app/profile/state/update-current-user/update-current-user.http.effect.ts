import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { User } from 'src/app/core/models';
import { HttpCommandHandler } from 'src/app/core/services/http/http-command.handler';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { UpdateCurrentUserAction, UpdateCurrentUserStateCommand } from './update-current-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class UpdateCurrentUserHttpEffect {

    constructor(
        private commandDispatcher: CommandDispatcher,
        private httpCommandHandler: HttpCommandHandler,
    ){  
        this.initCommandListener();   
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<UpdateCurrentUserStateCommand>(UpdateCurrentUserAction)
            .subscribe(res => this.handle(res.command.user, res.state))
    }

    protected handle(user: User, stateSnapshot: any): void{
        this.httpCommandHandler.handle({
            httpMethod: "PUT", 
            httpBody: user, 
            apiUrl: ApiUrl.Auth, 
            cancelMessage: "Oppdatering av profil er reversert"
        }, stateSnapshot)
    }

}