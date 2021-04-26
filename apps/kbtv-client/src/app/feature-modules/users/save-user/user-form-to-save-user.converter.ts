import { SaveUserAction } from '@actions/user-actions';
import { Roles } from '@core/roles.enum';
import { ModelState } from '@core/state/model-state.interface';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { Converter, ModelFormResult } from 'model/form';

export const _userFormToSaveUserConverter: Converter<ModelFormResult<UserForm, ModelState>, SaveUserAction> = (input) => {

    let {password, employer, ...entity} = input.formValue;
    entity.employerId = (entity.role !== Roles.Oppdragsgiver) ? undefined : employer?.id;

    entity = _modelIdGenerator(input.stateProp, entity); 

    return <SaveUserAction>{ 
        type: SaveUserAction, 
        stateProp:"users", 
        saveAction: input.saveAction,
        entity, password,     
    }
}