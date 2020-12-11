import { ModelFile } from '@core/models';
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { Reducer } from '@state/interfaces';
import { SaveModelFileAction } from './save-model-file.action';

export const SaveModelFileReducer: Reducer<any, SaveModelFileAction<ModelFile>> = {
    action: SaveModelFileAction,
    reducerFn: _reducerFn,
    stateProperties: SaveModelReducer.stateProperties
}

function _reducerFn(state: any, command: SaveModelFileAction<ModelFile>): Partial<any>{  

    command.entity = {
        ...command.entity, 
        fileName: command.fileWrapper?.modifiedFile?.name,
        temp_localFileUrl: URL.createObjectURL(command.fileWrapper?.modifiedFile)
    }; 

    return SaveModelReducer.reducerFn(state, command);       
}