import { ModelFile } from '@core/models';
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { Reducer } from '@state/interfaces';
import { SaveModelFileActionId, SaveModelFileStateCommand } from './save-model-file-action.const';

export const SaveModelFileReducer: Reducer<any> = {
    actionId: SaveModelFileActionId,
    reducerFn: _reducerFn,
    stateProperties: SaveModelReducer.stateProperties
}

function _reducerFn(state: any, command: SaveModelFileStateCommand<ModelFile, any>): Partial<any>{  

    command.entity = {
        ...command.entity, 
        fileName: command.fileWrapper?.modifiedFile?.name,
        temp_localFileUrl: URL.createObjectURL(command.fileWrapper?.modifiedFile)
    }; 

    return SaveModelReducer.reducerFn(state, command);       
}