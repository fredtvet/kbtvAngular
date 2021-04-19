import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { FormToSaveModelConverter, ModelFormToSaveModelInput } from 'model/form';
import { _flattenExistingForeigns } from '@shared-app/helpers/flatten-existing-foreigns.helper';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { SaveModelAction } from 'model/state-commands';

export const _formToSaveModelConverter: FormToSaveModelConverter<{}, ModelState, SaveModelAction<Model, ModelState>> =
    <TForm extends Model>(input: ModelFormToSaveModelInput<TForm, ModelState>): SaveModelAction<Model, ModelState> => {

    var entity = _flattenExistingForeigns(input.stateProp, input.formValue, input.options);
    entity = _modelIdGenerator(input.stateProp, entity); 
    
    return <SaveModelAction<Model, ModelState>>{
        type: SaveModelAction,
        stateProp: input.stateProp, 
        entity, 
        saveAction: input.saveAction
    }
}