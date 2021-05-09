import { SaveUserAction } from '@actions/user-actions';
import { User } from '@core/models';
import { Roles } from '@core/roles.enum';
import { ModelState } from '@core/state/model-state.interface';
import { SaveUserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { Converter, ModelFormResult } from 'model/form';

export const _userFormToSaveUserConverter: Converter<ModelFormResult<ModelState, User, SaveUserForm>, SaveUserAction> = (input) => {

    let {password, employer, ...entity} = input.formValue;
    let user: Partial<User> = entity;
    user.employerId = (entity.role !== Roles.Oppdragsgiver) ? undefined : employer?.id;

    return <SaveUserAction>{ 
        type: SaveUserAction, 
        stateProp:"users", 
        saveAction: input.saveAction,
        entity, password,     
    }
}