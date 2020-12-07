import { User } from '@core/models';
import { BaseFormToSaveModelStateCommandAdapter } from '@model/abstracts/base-form-to-save-model-state-command.adapter';
import { Roles } from '@shared-app/enums';
import { UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { ModelFormToSaveModelInput } from '@shared/model-form';
import { SaveUserActionId, SaveUserStateCommand } from './save-user-state-command.interface';

export class UserFormToSaveModelAdapter extends BaseFormToSaveModelStateCommandAdapter<User, UserForm>
    implements SaveUserStateCommand{

    actionId: string = SaveUserActionId;
    password: string;
    
    constructor(input:  ModelFormToSaveModelInput<UserForm>){
        super(input);
    }

    protected adapt(): void{
        let entity = this.input.formState;
        if(entity.role !== Roles.Oppdragsgiver) entity.employerId = null;
        this.password = entity.password;
        super.adapt();
    }

    protected convertFormStateToEntity(): void{
        delete this.input.formState.password;
        this.entity = this.input.formState;
    }
}