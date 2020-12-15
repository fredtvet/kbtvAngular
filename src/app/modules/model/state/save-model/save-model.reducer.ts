import { _add } from '@array/add.helper';
import { _update } from '@array/update.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { _modifyModelWithForeigns } from '../../helpers/modify-model-with-foreigns.helper';
import { ModelCommand } from '../../model-command.enum';
import { ModelStateConfig } from '../../model-state.config';
import { SaveModelAction } from './save-model.action';
import { UnknownState } from '@model/interfaces';

export const SaveModelReducer = _createReducer(
    SaveModelAction,
    (state: Immutable<UnknownState>, command: Immutable<SaveModelAction<UnknownState, UnknownState>>): Partial<UnknownState> => {  
        const modelConfig = ModelStateConfig.get(command.stateProp); 
    
        let modifyFn: (entity: Immutable<Object>, entities: ImmutableArray<Object>) => ImmutableArray<Object>;
    
        if(command.saveAction === ModelCommand.Update) 
            modifyFn = (entity: Immutable<Object>, entities: ImmutableArray<Object>): ImmutableArray<Object> => 
                _update(entities, entity, modelConfig.identifier)
        else 
            modifyFn = (entity: Immutable<Object>, entities: ImmutableArray<Object>): ImmutableArray<Object> =>   
                _add(entities, entity)
    
        return _modifyModelWithForeigns(state, command.stateProp, command.entity, modifyFn)          
    }
)
