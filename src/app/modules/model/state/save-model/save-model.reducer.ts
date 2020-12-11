import { _add } from '@array/add.helper';
import { _update } from '@array/update.helper';
import { Reducer } from '@state/interfaces';
import { _modifyModelWithForeigns } from '../../helpers/modify-model-with-foreigns.helper';
import { ModelCommand } from '../../model-command.enum';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelAction } from './save-model.action';

export const SaveModelReducer: Reducer<any, SaveModelAction<any, any>> = {
    action: SaveModelAction,
    reducerFn: _reducerFn,
    stateProperties: _statePropertiesGetter
}

function _statePropertiesGetter(command: SaveModelAction<any, any>): string[]{
    const stateProps: string[] = [command.stateProp];
    const modelConfig = ModelStateConfig.get(command.stateProp); 
    if(modelConfig.foreigns)
       for(const fkProp of modelConfig.foreigns){
          const fkCfg = ModelStateConfig.get(fkProp);
          if(command.entity[fkCfg.foreignProp]) stateProps.push(fkProp);
       }

    return stateProps;
}

function _reducerFn(state: any, command: SaveModelAction<any, any>): Partial<any>{  
    const modelConfig = ModelStateConfig.get(command.stateProp); 

    command.entity.updatedAt = new Date().getTime();  //Need to isolate and expose this

    let modifyFn: (entity: any, entities: ReadonlyArray<Object>) => Object;

    if(command.saveAction === ModelCommand.Update) 
        modifyFn = (entity: any, entities: any[]) =>  _update(entities, entity, modelConfig.identifier)
    else 
        modifyFn = (entity: any, entities: any[]) =>  _add(entities, entity)

    return _modifyModelWithForeigns(state, command.stateProp, command.entity, modifyFn)          
}
