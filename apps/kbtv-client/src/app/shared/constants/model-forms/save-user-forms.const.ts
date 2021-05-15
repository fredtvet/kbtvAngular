import { Validators } from '@angular/forms';
import { User } from '@core/models';
import { IContactable } from '@core/models/sub-interfaces/icontactable.interface';
import { IFullName } from '@core/models/sub-interfaces/ifullname.interface';
import { Roles } from '@core/roles.enum';
import { StateEmployers, StateUsers } from '@core/state/global-state.interfaces';
import { DynamicControl } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { map } from 'rxjs/operators';
import { _userFormToSaveUserConverter } from '../../action-converters/user-form-to-save-user.converter';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';
import { SelectQuestion, SelectQuestionComponent } from '../../scam/dynamic-form-questions/select-question.component';
import { isUniqueAsyncValidator } from '../../validators/is-unique.async.validator';
import { EmailControl, EmployerSelectControl, FirstNameControl, LastNameControl, PhoneNumberControl, UserNameControl } from '../common-controls.const';

export interface SaveUserForm extends Pick<User, "userName" | "role" | "employer">, IContactable, IFullName {
    password?: string;
}

type FormState = StateUsers & StateEmployers;

const AvailableRoles = Object.keys(Roles).filter(x => x !== Roles.Leder).map(key => Roles[key as keyof typeof Roles]);

const UniqueUserNameControl: Immutable<DynamicControl<string, FormState>> = {
    ...UserNameControl, 
    required: true,     
    asyncStateValidators: [
        (s$) => isUniqueAsyncValidator(s$.pipe(map(s => s?.users)), (x, y) => x.userName.toLowerCase() === y.toLowerCase())
    ],
}
const RoleControl: Immutable<DynamicControl<string>> = { 
    required: true, questionComponent: SelectQuestionComponent,
    question: <SelectQuestion<string, null>>{
        placeholder: "Rolle",
        lazyOptions: "all",
        stateBindings: { options: AvailableRoles }
    },  
    validators: [ Validators.maxLength(100)] 
}
const PasswordControl: Immutable<DynamicControl<string>> = { 
    required: true, questionComponent: InputQuestionComponent, 
    question: <InputQuestion>{placeholder: "Passord", hideable: true, defaultHidden: true},
    validators: [Validators.minLength(7), Validators.maxLength(100)] 
}

export const CreateUserModelForm: Immutable<ModelFormConfig<FormState, User,  SaveUserForm, FormState>> = {
    includes: {prop: "users", foreigns: "all"}, 
    actionConverter: _userFormToSaveUserConverter,
    dynamicForm: {
        submitText: "Legg til",
        hideOnValueChangeMap: { employer: (f) => f.role !== Roles.Oppdragsgiver },
        controls: {
            userName: UniqueUserNameControl,
            password: PasswordControl,
            firstName: {...FirstNameControl, required: true},
            lastName: {...LastNameControl, required: true},
            role: RoleControl,
            employer: EmployerSelectControl,
            phoneNumber: PhoneNumberControl,
            email: EmailControl, 
        },
    }
}

export const EditUserModelForm: Immutable<ModelFormConfig<FormState, User, SaveUserForm, FormState>> = {
    includes: {prop: "users", foreigns: "all"},
    actionConverter: _userFormToSaveUserConverter,
    dynamicForm: {
        submitText: "Oppdater", options: { getRawValue: true }, 
        disabledControls: { userName:true },
        hideOnValueChangeMap: { employer: (f) => f.role !== Roles.Oppdragsgiver },
        controls: {
            userName: UniqueUserNameControl,
            firstName: {...FirstNameControl, required: true},
            lastName: {...LastNameControl, required: true},
            role: RoleControl,
            employer: EmployerSelectControl,
            phoneNumber: PhoneNumberControl,
            email: EmailControl, 
        },
    }
}