import { Injectable } from '@angular/core';
import { ObservableStore } from '../../../state/abstracts/observable-store';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { ObservableStoreBase } from '../../../state/observable-store-base';
import { ModelStateConfig } from '../../model-state.config';
import { DeleteModelWithChildrenHelper } from '../../state-helpers/delete-model-with-children.helper';
import { DeleteModelAction, DeleteModelStateCommand } from './delete-model-state-command.interface';

@Injectable({providedIn: 'root'})
export class DeleteModelReducer extends ObservableStore<any>{

    constructor(
        base: ObservableStoreBase,
        private commandDispatcher: CommandDispatcher,
        private deleteModelWithChildrenHelper: DeleteModelWithChildrenHelper
    ){ 
        super(base);
        this.initCommandListener();
    }

    private initCommandListener(): void{
        this.commandDispatcher.listen$<DeleteModelStateCommand>(DeleteModelAction)
            .subscribe(res => this.handle(res.command))
    }

    private handle(command: DeleteModelStateCommand): void{
        if(!command.id && (!command.ids || command.ids.length === 0)) console.error("Id(s) required to delete entities");

        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);


        const stateProps: any[] = [command.stateProp];
        if(modelConfig.children) 
            stateProps.push(modelConfig.children);

        this.setStateWithStateFunc(stateProps, (state: any)  => this.modifyState(state, command));
    }

    private modifyState(state: any, command: DeleteModelStateCommand): Partial<any>{  
        return this.deleteModelWithChildrenHelper.delete(state, command.stateProp, command)    
    }
}