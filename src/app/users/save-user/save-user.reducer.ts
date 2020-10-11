import { Injectable } from '@angular/core';
import { ModifyModelWithForeignsHelper } from 'src/app/core/services/model/state-helpers/modify-model-with-foreigns.helper';
import { SaveModelReducer } from 'src/app/core/services/model/state/save-model/save-model.reducer';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { SaveUserAction, SaveUserStateCommand } from './save-user-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveUserReducer extends SaveModelReducer {

    constructor(
        base: ObservableStoreBase,
        commandDispatcher: CommandDispatcher,
        modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
    ){  
        super(base, commandDispatcher, modifyModelWithForeignsHelper)
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveUserStateCommand>(SaveUserAction)
            .subscribe(res => this.handle(res.command))
    }
}