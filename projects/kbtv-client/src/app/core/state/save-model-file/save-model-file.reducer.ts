import { ModelFile } from '@core/models';
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from 'global-types';
import { ModelState } from '../model-state.interface';
import { SaveModelFileAction } from './save-model-file.action';

export const SaveModelFileReducer = _createReducer(
    SaveModelFileAction, 
    (state: Immutable<ModelState>, action: Immutable<SaveModelFileAction<ModelFile>>) => {  
        
        const entity: Immutable<ModelFile> = {
            ...action.entity, 
            fileName: action.fileWrapper?.modifiedFile?.name,
            localFileUrl: URL.createObjectURL(action.fileWrapper?.modifiedFile)
        }
        
        return SaveModelReducer.reducerFn(state, <SaveModelFileAction<ModelFile>>{...action, entity});       
    }
);


