import { Injectable } from '@angular/core';
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { UpdateCurrentUserStateCommand, UpdateCurrentUserAction } from './update-current-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class UpdateCurrentUserReducer extends ObservableStore<any>{

    constructor(
        base: ObservableStoreBase,
        private commandDispatcher: CommandDispatcher,
    ){ 
        super(base);
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