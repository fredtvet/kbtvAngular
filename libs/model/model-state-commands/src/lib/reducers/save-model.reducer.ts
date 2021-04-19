import { _add, _update } from 'array-helpers';
import { Immutable, ImmutableArray, Prop, UnknownState } from 'global-types';
import { _getModelConfig, _modifyModelWithForeigns } from 'model/core';
import { Reducer, _createReducer } from 'state-management';
import { SaveModelAction } from '../actions';
import { ModelCommand } from '../model-command.enum';

export const SaveModelReducer: Reducer<Immutable<UnknownState>, SaveModelAction<UnknownState, UnknownState>> = _createReducer(
    SaveModelAction,
    <T extends {}>(state: Immutable<T>, command: Immutable<SaveModelAction<T, {}>>): Partial<{}> => {  
        const modelConfig = _getModelConfig(command.stateProp); 
    
        let modifyFn: (entity: Immutable<T>, entities: ImmutableArray<T>) => ImmutableArray<T>;
    
        if(command.saveAction === ModelCommand.Update) 
            modifyFn = (entity: Immutable<T>, entities: ImmutableArray<T>): ImmutableArray<T> => 
                _update(entities, entity, <Prop<Immutable<T>>> modelConfig.idProp)
        else 
            modifyFn = (entity: Immutable<T>, entities: ImmutableArray<T>): ImmutableArray<T> =>   
                _add(entities, entity)
    
        return _modifyModelWithForeigns(state, command.stateProp, command.entity, modifyFn)          
    }
)
