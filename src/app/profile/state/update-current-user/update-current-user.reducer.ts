import { Injectable } from '@angular/core';
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { UpdateCurrentUserAction, UpdateCurrentUserStateCommand } from './update-current-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class UpdateCurrentUserReducer extends ObservableStore<any>{

    constructor(private commandDispatcher: CommandDispatcher){ 
        super();
        this.initCommandListener();
    }

    private initCommandListener(): void{
        this.commandDispatcher.listen$<UpdateCurrentUserStateCommand>(UpdateCurrentUserAction)
            .subscribe(res => this.handle(res.command))
    }

    private handle(command: UpdateCurrentUserStateCommand): void{
        this.setStateWithStateFunc(["currentUser"], (state: any)  => this.modifyState(state, command));
    }

    private modifyState(state: any, command: UpdateCurrentUserStateCommand): Partial<any>{  
        return { currentUser: {...state.currentUser, ...command.user} }   
    }
}