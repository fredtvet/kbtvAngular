import { SaveModelFileAction } from '@actions/global-actions';
import { Model, ModelFile } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { ModelFileWrapper } from '@shared/model-file.wrapper';
import { ModelConfig, _getModelConfig } from 'model/core';
import { Converter, ModelFormResult } from 'model/form';

export type ModelFileForm = ModelFile & {file: File};
type FormResult = ModelFormResult<ModelFileForm, ModelState>

export const _formToSaveModelFileConverter: Converter<FormResult, SaveModelFileAction<ModelFile>> = (input) => {
    let {file, ...entity} = input.formValue;
    entity = _modelIdGenerator(input.stateProp, entity); 
    const modelCfg = _getModelConfig<ModelConfig<ModelFile,ModelState>>(input.stateProp);

    return <SaveModelFileAction<Model>>{
        type: SaveModelFileAction,
        stateProp: input.stateProp, 
        entity, 
        fileWrapper: new ModelFileWrapper(file, entity[modelCfg.idProp]), 
        saveAction: input.saveAction
    }
}