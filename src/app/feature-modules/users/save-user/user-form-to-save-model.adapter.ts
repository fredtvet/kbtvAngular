import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { ModelFormToSaveModelInput } from '@model-form/interfaces';
import { Roles } from '@shared-app/enums';
import { UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { BaseFormToSaveModelStateCommandAdapter } from '@shared/form-adapters/base-form-to-save-model-state-command.adapter';
import { SaveUserActionId, SaveUserStateCommand } from './save-user-state-command.interface';

export class UserFormToSaveModelAdapter extends BaseFormToSaveModelStateCommandAdapter<User, UserForm>
    implements SaveUserStateCommand{

    actionId: string = SaveUserActionId;
    password: string;
    
    constructor(input:  ModelFormToSaveModelInput<UserForm, ModelState>){
        super(input);
    }

    protected adapt(): void{
        let entity = this.input.formValue;
        if(entity.role !== Roles.Oppdragsgiver) entity.employerId = null;
        this.password = entity.password;
        super.adapt();
    }

    protected convertFormStateToEntity(): void{
        delete this.input.formValue.password;
        this.entity = this.input.formValue;
    }
}