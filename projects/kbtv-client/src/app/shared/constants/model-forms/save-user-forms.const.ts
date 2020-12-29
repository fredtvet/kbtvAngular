import { Validators } from '@angular/forms';
import { Employer, User } from '@core/models';
import { StateEmployers, StateUsers } from '@core/state/global-state.interfaces';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { Roles } from '@shared-app/enums';
import { isUniqueAsyncValidator } from '@shared/validators/is-unique.async.validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InputQuestion, InputQuestionComponent } from '../../components/dynamic-form-questions/input-question.component';
import { SelectQuestion, SelectQuestionComponent } from '../../components/dynamic-form-questions/select-question.component';
import { EmailControl, EmployerSelectControl, FirstNameControl, LastNameControl, PhoneNumberControl, UserNameControl } from '../common-controls.const';

export interface UserForm extends User { password?: string; }

type FormState = OptionsFormState<StateUsers & StateEmployers>;

const AvailableRoles = Object.keys(Roles).filter(x => x !== Roles.Leder).map(key => Roles[key as keyof typeof Roles]);

const UniqueUserNameControl = {...UserNameControl, required: true,     
    asyncStateValidators: [
    (s$: Observable<FormState>) => 
        isUniqueAsyncValidator<User>(s$.pipe(map(s => s?.options?.users)), (x, y) => x.userName.toLowerCase() === y.toLowerCase())
    ],
}
const RoleControl = <DynamicControl<UserForm, StateUsers>>{ name: "role", required: true,
    type: "control", valueGetter: (s: UserForm) => s?.role, questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<string>>{
            placeholder: "Rolle",
            optionsGetter: () => AvailableRoles
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
const EmployerControl = <DynamicControl<{employer: Employer}, OptionsFormState<FormState>>>{
    ...EmployerSelectControl, 
    questions: [{...(EmployerSelectControl.questions ? EmployerSelectControl.questions[0] : null), 
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

