import { _add } from '@array/add.helper';
import { _update } from '@array/update.helper';
import { Immutable, ImmutableArray } from '@global/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { _modifyModelWithForeigns } from '../../helpers/modify-model-with-foreigns.helper';
import { ModelCommand } from '../../model-command.enum';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelAction } from './save-model.action';

export const SaveModelReducer = _createReducer(
    SaveModelAction,
    <T extends {}>(state: Immutable<T>, command: Immutable<SaveModelAction<T, {}>>): Partial<{}> => {  
        const modelConfig = ModelStateConfig.get(command.stateProp); 
    
        let modifyFn: (entity: Immutable<T>, entities: ImmutableArray<T>) => ImmutableArray<T>;
    
        if(command.saveAction === ModelCommand.Update) 
            modifyFn = (entity: Immutable<T>, entities: ImmutableArray<T>): ImmutableArray<T> => 
                _update(entities, entity, modelConfig.identifier)
        else 
            modifyFn = (entity: Immutable<T>, entities: ImmutableArray<T>): ImmutableArray<T> =>   
                _add(entities, entity)
    
        return _modifyModelWithForeigns(state, command.stateProp, command.entity, modifyFn)          
    }
)
