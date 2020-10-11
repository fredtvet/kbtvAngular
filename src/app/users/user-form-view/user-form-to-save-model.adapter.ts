import { User } from 'src/app/core/models';
import { BaseFormToSaveModelStateCommandAdapter } from 'src/app/core/services/model/abstracts/base-form-to-save-model-state-command.adapter';
import { ModelFormToSaveModelInput } from 'src/app/core/services/model/form/interfaces/model-form-to-state-command-adapter.interface';
import { Roles } from 'src/app/shared-app/enums';
import { SaveUserAction, SaveUserStateCommand } from '../save-user/save-user-state-command.interface';
import { UserForm } from '../user-form-view/user-form.interface';

export class UserFormToSaveModelAdapter extends BaseFormToSaveModelStateCommandAdapter<User, UserForm>
    implements SaveUserStateCommand{

    action: string = SaveUserAction;
    password: string;
    
    constructor(input:  ModelFormToSaveModelInput<UserForm>){
        super(input);
    }

    protected adapt(): void{
        if(this.input.formState.role !== Roles.Oppdragsgiver) this.input.formState.employerId = null;
        this.password = this.input.formState.password;
        super.adapt();
    }

    protected convertFormStateToEntity(): void{
        delete this.input.formState.password;
        this.entity = this.input.formState;
    }
}