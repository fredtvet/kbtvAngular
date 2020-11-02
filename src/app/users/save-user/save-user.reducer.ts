import { Injectable } from '@angular/core';
import { ModifyModelWithForeignsHelper } from 'src/app/core/services/model/state-helpers/modify-model-with-foreigns.helper';
import { SaveModelReducer } from 'src/app/core/services/model/state/save-model/save-model.reducer';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { SaveUserAction, SaveUserStateCommand } from './save-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveUserReducer extends SaveModelReducer {

    constructor(
        commandDispatcher: CommandDispatcher,
        modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
    ){  
        super(commandDispatcher, modifyModelWithForeignsHelper)
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveUserStateCommand>(SaveUserAction)
            .subscribe(res => this.handle(res.command))
    }
}