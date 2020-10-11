import { Injectable } from '@angular/core';
import { ObservableStore } from '../../../state/abstracts/observable-store';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { ObservableStoreBase } from '../../../state/observable-store-base';
import { SaveModelAction, SaveModelStateCommand } from './save-model-state-command.interface';
import { ModelConfig, ModelStateConfig } from '../../model-state.config';
import { ModifyModelWithForeignsHelper } from '../../state-helpers/modify-model-with-foreigns.helper';
import { Model } from '../../../../models';
import { StateAction } from '../../../state/state-action.enum';
import { _update } from 'src/app/shared-app/helpers/array/update.helper';
import { _add } from 'src/app/shared-app/helpers/array/add.helper';

@Injectable({providedIn: 'root'})
export class SaveModelReducer extends ObservableStore<any>{

    constructor(
        base: ObservableStoreBase,
        protected commandDispatcher: CommandDispatcher,
        private modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
    ){ 
        super(base);
        this.initCommandListener();
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveModelStateCommand<Model>>(SaveModelAction)
            .subscribe(res => this.handle(res.command))
    }
    
    protected handle(command: SaveModelStateCommand<Model>): void{
        if(!command.entity) console.error("No entity provided");

        const modelConfig = ModelStateConfig.get(command.stateProp);
        if(!modelConfig) console.error(`No model config for property ${command.stateProp}`);

        const stateProps = this.getCommandStateProperties(command, modelConfig);
        
        this.setStateWithStateFunc(stateProps, (state: any)  => this.modifyState(state, command, modelConfig));
    }

    protected getCommandStateProperties(command: SaveModelStateCommand<Model>, modelConfig: ModelConfig): string[]{
        const stateProps: string[] = [command.stateProp];

        if(modelConfig.foreigns)
           for(const fkProp of modelConfig.foreigns){
              const fkCfg = ModelStateConfig.get(fkProp as any);
              if(command.entity[fkCfg.foreignProp]) stateProps.push(fkProp);
           }

        return stateProps;
    }

    protected modifyState(state: any, command: SaveModelStateCommand<Model>, modelConfig: ModelConfig): Partial<any>{  
        command.entity.updatedAt = new Date().getTime();  

        let modifyFn: (entity: Model, entities: Model[]) => void;

        if(command.saveAction === StateAction.Update) 
            modifyFn = (entity: Model, entities: Model[]) =>  _update(entities, entity, modelConfig.identifier)
        else 
            modifyFn = (entity: Model, entities: Model[]) =>  _add(entities, entity)

        return this.modifyModelWithForeignsHelper
            .modify(state, command.stateProp, command.entity, modifyFn)          
    }
    
}