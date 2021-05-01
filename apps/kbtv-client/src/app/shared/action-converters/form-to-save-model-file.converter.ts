import { SaveModelFileAction } from '@actions/global-actions';
import { ModelFile } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { ModelFileWrapper } from '@shared/model-file.wrapper';
import { UnknownState } from 'global-types';
import { ModelConfig, _getModelConfig } from 'model/core';
import { Converter, ModelFormResult } from 'model/form';

export type ModelFileForm = {file: File};
type FormResult = ModelFormResult<ModelFileForm, ModelState>

export const _formToSaveModelFileConverter: Converter<FormResult, SaveModelFileAction<ModelFile>> = (input) => {
    let {file, ...entity} = input.formValue;
    entity = _modelIdGenerator(input.stateProp, entity); 
    const modelCfg = _getModelConfig<ModelConfig<ModelFile,ModelState>>(input.stateProp);

    return {
        type: SaveModelFileAction,
        stateProp: input.stateProp, 
        entity, 
        fileWrapper: new ModelFileWrapper(file, (<UnknownState> entity)[modelCfg.idProp]), 
        saveAction: input.saveAction
    }
}