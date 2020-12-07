import { Model } from '@core/models';
import { ActionType } from '@shared-app/enums';
import { _add } from '@shared-app/helpers/array/add.helper';
import { _update } from '@shared-app/helpers/array/update.helper';
import { Reducer } from '../../../state/interfaces/reducer.interface';
import { _modifyModelWithForeigns } from '../../helpers/modify-model-with-foreigns.helper';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelActionId, SaveModelStateCommand } from './save-model-action.const';

export const SaveModelReducer: Reducer<any> = {
    actionId: SaveModelActionId,
    reducerFn: _reducerFn,
    stateProperties: _statePropertiesGetter
}

function _statePropertiesGetter(command: SaveModelStateCommand<Model>): string[]{
    const stateProps: string[] = [command.stateProp];
    const modelConfig = ModelStateConfig.get(command.stateProp); 
    if(modelConfig.foreigns)
       for(const fkProp of modelConfig.foreigns){
          const fkCfg = ModelStateConfig.get(fkProp as any);
          if(command.entity[fkCfg.foreignProp]) stateProps.push(fkProp);
       }

    return stateProps;
}

function _reducerFn(state: any, command: SaveModelStateCommand<Model>): Partial<any>{  
    const modelConfig = ModelStateConfig.get(command.stateProp); 

    command.entity.updatedAt = new Date().getTime();  

    let modifyFn: (entity: Model, entities: Model[]) => void;

    if(command.saveAction === ActionType.Update) 
        modifyFn = (entity: Model, entities: Model[]) =>  _update(entities, entity, modelConfig.identifier)
    else 
        modifyFn = (entity: Model, entities: Model[]) =>  _add(entities, entity)

    return _modifyModelWithForeigns(state, command.stateProp, command.entity, modifyFn)          
}
