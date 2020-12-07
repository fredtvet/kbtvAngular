import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@core/models';
import { DynamicControl, DynamicForm } from '@dynamic-forms/interfaces';
import { Roles } from '@shared-app/enums';
import { StateUsers, StateEmployers } from '@state/interfaces';
import { InputQuestionComponent, InputQuestion } from '../../components/dynamic-form-questions/input-question.component';
import { SelectQuestionComponent, SelectQuestion } from '../../components/dynamic-form-questions/select-question.component';
import { isUniqueAsyncValidator } from '../../form/validators/is-unique.async.validator';
import { SaveModelFormState } from '../../model-form';
import { EmailControl, EmployerSelectControl, FirstNameControl, LastNameControl, PhoneNumberControl, UserNameControl } from '../common-controls.const';

export interface UserForm extends User {
    password?: string;
}

type FormState = SaveModelFormState<StateUsers & StateEmployers>;

const AvailableRoles = Object.keys(Roles).filter(x => x !== Roles.Leder).map(key => Roles[key] as string);

const UniqueUserNameControl = {...UserNameControl, required: true,     
    asyncStateValidators: [
    (s$: Observable<FormState>) => 
        isUniqueAsyncValidator(s$.pipe(map(s => s?.options?.users)), "userName")
    ],
}
const RoleControl = <DynamicControl<UserForm, FormState>>{ name: "role", required: true,
    type: "control", valueGetter: (s: UserForm) => s?.role, questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<string>>{
            placeholder: "Rolle",
            optionsGetter: (s: FormState) => AvailableRoles
        }, 
    }], 
    validators: [ Validators.maxLength(100)] 
}
const PasswordControl = <DynamicControl<UserForm, FormState>>{ name: "password", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Passord", hideable: true, defaultHidden: true}, 
    }], 
    validators: [Validators.minLength(7), Validators.maxLength(100)] 
}
const EmployerControl = {
    ...EmployerSelectControl, 
    questions: [{...EmployerSelectControl.questions[0], 
        hideOnValueChange: {controlName: "role", callback: (role: string) => role !== Roles.Oppdragsgiver}}]
}

export const CreateUserForm: DynamicForm<UserForm, FormState> = {
    submitText: "Legg til",
    controls: [
        UniqueUserNameControl,
        PasswordControl,
        {...FirstNameControl, required: true},
        {...LastNameControl, required: true},
        RoleControl,
        EmployerControl,
        PhoneNumberControl,
        EmailControl, 
    ],
}

export const EditUserForm: DynamicForm<UserForm, FormState> = {
    submitText: "Oppdater", getRawValue: true, disabledControls: {userName:true},
    controls: [ 
        UniqueUserNameControl,
        {...FirstNameControl, required: true},
        {...LastNameControl, required: true},
        RoleControl,
        EmployerControl,
        PhoneNumberControl,
        EmailControl, 
    ],
}

