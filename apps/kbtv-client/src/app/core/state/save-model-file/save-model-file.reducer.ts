import { ModelFile } from '@core/models';
import { SaveModelReducer } from 'state-model';
import { _createReducer } from 'state-management'
import { Immutable } from 'global-types';
import { ModelState } from '../model-state.interface';
import { SaveModelFileAction } from './save-model-file.action';

export const SaveModelFileReducer = _createReducer(
    SaveModelFileAction, 
    (state: Immutable<ModelState>, action: Immutable<SaveModelFileAction<Immutable<ModelFile>>>) => {  
        
        const entity: Immutable<ModelFile> = {
            ...action.entity, 
            fileName: action.fileWrapper?.modifiedFile?.name,
            localFileUrl: action.fileWrapper ? URL.createObjectURL(action.fileWrapper.modifiedFile) : undefined
        }
        
        return SaveModelReducer.reducerFn(state, <SaveModelFileAction<Immutable<ModelFile>>>{...action, entity});       
    }
);


