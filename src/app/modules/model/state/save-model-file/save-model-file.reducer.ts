import { ModelFile } from '@core/models';
import { Reducer } from '../../../state/interfaces/reducer.interface';
import { SaveModelReducer } from '../save-model/save-model.reducer';
import { SaveModelFileActionId, SaveModelFileStateCommand } from './save-model-file-action.const';

export const SaveModelFileReducer: Reducer<any> = {
    actionId: SaveModelFileActionId,
    reducerFn: _reducerFn,
    stateProperties: SaveModelReducer.stateProperties
}

function _reducerFn(state: any, command: SaveModelFileStateCommand<ModelFile>): Partial<any>{  

    command.entity = {
        ...command.entity, 
        fileName: command.fileWrapper?.modifiedFile?.name,
        temp_localFileUrl: URL.createObjectURL(command.fileWrapper?.modifiedFile)
    }; 

    return SaveModelReducer.reducerFn(state, command);       
}