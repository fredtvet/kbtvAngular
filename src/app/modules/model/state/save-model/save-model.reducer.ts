import { _add } from '@array/add.helper';
import { _update } from '@array/update.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { _modifyModelWithForeigns } from '../../helpers/modify-model-with-foreigns.helper';
import { ModelCommand } from '../../model-command.enum';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelAction } from './save-model.action';

export const SaveModelReducer = _createReducer(
    SaveModelAction,
    (state: Immutable<any[]>, command: Immutable<SaveModelAction<any, any>>): Partial<any> => {  
        const modelConfig = ModelStateConfig.get(command.stateProp); 
    
        let modifyFn: <T>(entity: Immutable<T>, entities: ImmutableArray<T>) => ImmutableArray<T>;
    
        if(command.saveAction === ModelCommand.Update) 
            modifyFn = (entity: Immutable<any>, entities: ImmutableArray<any>): ImmutableArray<any> => 
                _update(entities, entity, modelConfig.identifier)
        else 
            modifyFn = (entity: Immutable<any>, entities: ImmutableArray<any>): ImmutableArray<any> =>   
                _add(entities, entity)
    
        return _modifyModelWithForeigns(state, command.stateProp as any, command.entity, modifyFn)          
    }
)
