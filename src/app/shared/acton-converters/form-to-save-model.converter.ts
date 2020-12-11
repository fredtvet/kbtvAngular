import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { FormToSaveModelConverter, ModelFormToSaveModelInput } from '@model-form/interfaces';
import { SaveModelAction } from '@model/state/save-model/save-model.action';
import { _flattenExistingForeigns } from '@shared-app/helpers/flatten-existing-foreigns.helper';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';

export const _formToSaveModelConverter: FormToSaveModelConverter<any, ModelState, SaveModelAction<Model, ModelState>> =
    <TForm>(input: ModelFormToSaveModelInput<TForm, ModelState>): SaveModelAction<Model, ModelState> => {

    var entity = _flattenExistingForeigns<Model>(input.stateProp, input.formValue, input.options);
    entity = _modelIdGenerator(input.stateProp, entity); 
    
    return new SaveModelAction<Model, ModelState>(input.stateProp, entity, input.saveAction)
}