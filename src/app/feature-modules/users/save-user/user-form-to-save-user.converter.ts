import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { FormToSaveModelConverter, ModelFormToSaveModelInput } from '@model-form/interfaces';
import { Roles } from '@shared-app/enums';
import { _flattenExistingForeigns } from '@shared-app/helpers/flatten-existing-foreigns.helper';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { SaveUserAction } from './save-user.action';

export const _userFormToSaveUserConverter: FormToSaveModelConverter<UserForm, ModelState, SaveUserAction> =
    (input: ModelFormToSaveModelInput<UserForm, ModelState>): SaveUserAction => {
        
    const password = input.formValue.password;
    delete input.formValue.password;

    var entity = _flattenExistingForeigns<User>(input.stateProp, input.formValue, input.options);
    
    if(entity.role !== Roles.Oppdragsgiver) entity.employerId = null;
    
    entity = _modelIdGenerator(input.stateProp, entity); 

    return new SaveUserAction(entity, password, input.saveAction)
}