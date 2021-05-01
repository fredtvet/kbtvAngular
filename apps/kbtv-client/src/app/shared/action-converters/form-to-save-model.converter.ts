import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { Converter, ModelFormResult } from 'model/form';
import { SaveModelAction } from 'model/state-commands';

export const _formToSaveModelConverter: Converter<ModelFormResult<object, ModelState>, SaveModelAction<Model, ModelState>> =
    (input) => { return {
        type: SaveModelAction,
        stateProp: input.stateProp, 
        entity: _modelIdGenerator(input.stateProp, input.formValue), 
        saveAction: input.saveAction
    }
}