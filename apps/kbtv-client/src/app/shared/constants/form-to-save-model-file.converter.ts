import { SaveModelFileAction } from '@core/global-actions';
import { ModelFile } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { Converter, ModelFormResult } from 'model/form';

export type ModelFileForm = {file: File};
type FormResult = ModelFormResult<ModelState, ModelFile, ModelFileForm>

export const _formToSaveModelFileConverter: Converter<FormResult, SaveModelFileAction<ModelFile>> = (input) => {
    let {file, ...entity} = input.formValue;
    return {
        type: SaveModelFileAction,
        stateProp: input.stateProp, 
        entity, file, 
        saveAction: input.saveAction
    }
}