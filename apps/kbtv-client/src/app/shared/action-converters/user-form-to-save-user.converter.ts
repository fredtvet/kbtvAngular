import { SaveUserAction } from '@actions/user-actions';
import { User } from '@core/models';
import { Roles } from '@core/roles.enum';
import { ModelState } from '@core/state/model-state.interface';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { SaveUserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { Converter, ModelFormResult } from 'model/form';

export const _userFormToSaveUserConverter: Converter<ModelFormResult<SaveUserForm, ModelState>, SaveUserAction> = (input) => {

    let {password, employer, ...entity} = input.formValue;
    let user: Partial<User> = entity;
    user.employerId = (entity.role !== Roles.Oppdragsgiver) ? undefined : employer?.id;

    user = _modelIdGenerator(input.stateProp, user); 

    return <SaveUserAction>{ 
        type: SaveUserAction, 
        stateProp:"users", 
        saveAction: input.saveAction,
        entity, password,     
    }
}