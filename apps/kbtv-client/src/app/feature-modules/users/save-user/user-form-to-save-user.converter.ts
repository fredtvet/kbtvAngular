import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { FormToSaveModelConverter, ModelFormToSaveModelInput } from 'model-form';
import { _flattenExistingForeigns } from '@shared-app/helpers/flatten-existing-foreigns.helper';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { SaveUserAction } from './save-user.action';
import { Roles } from '@core/roles.enum';

export const _userFormToSaveUserConverter: FormToSaveModelConverter<UserForm, ModelState, SaveUserAction> =
    (input: ModelFormToSaveModelInput<UserForm, ModelState>): SaveUserAction => {
        
    const clone = {...input.formValue, password: undefined}
    var entity = _flattenExistingForeigns<User>(input.stateProp, clone, input.options);
    
    if(entity.role !== Roles.Oppdragsgiver) entity = {...entity, employerId: undefined};
    
    entity = _modelIdGenerator(input.stateProp, entity); 

    return <SaveUserAction>{ 
        type: SaveUserAction, 
        entity, 
        password: input.formValue.password, 
        saveAction: input.saveAction,  
        stateProp:"users" 
    }
}