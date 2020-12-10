import { ModelCommand } from '../../model-command.enum';
import { _add } from '@array/add.helper';
import { _update } from '@array/update.helper';
import { _modifyModelWithForeigns } from '../../helpers/modify-model-with-foreigns.helper';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelActionId, SaveModelStateCommand } from './save-model-action.const';
import { Reducer } from '@state/interfaces';

export const SaveModelReducer: Reducer<any, SaveModelStateCommand<any, any>> = {
    actionId: SaveModelActionId,
    reducerFn: _reducerFn,
    stateProperties: _statePropertiesGetter
}

function _statePropertiesGetter(command: SaveModelStateCommand<any, any>): string[]{
    const stateProps: string[] = [command.stateProp];
    const modelConfig = ModelStateConfig.get(command.stateProp); 
    if(modelConfig.foreigns)
       for(const fkProp of modelConfig.foreigns){
          const fkCfg = ModelStateConfig.get(fkProp);
          if(command.entity[fkCfg.foreignProp]) stateProps.push(fkProp);
       }

    return stateProps;
}

function _reducerFn(state: any, command: SaveModelStateCommand<any, any>): Partial<any>{  
    const modelConfig = ModelStateConfig.get(command.stateProp); 

    command.entity.updatedAt = new Date().getTime();  //Need to isolate and expose this

    let modifyFn: (entity: any, entities: ReadonlyArray<Object>) => Object;

    if(command.saveAction === ModelCommand.Update) 
        modifyFn = (entity: any, entities: any[]) =>  _update(entities, entity, modelConfig.identifier)
    else 
        modifyFn = (entity: any, entities: any[]) =>  _add(entities, entity)

    return _modifyModelWithForeigns(state, command.stateProp, command.entity, modifyFn)          
}
