import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employer, User } from 'src/app/core/models';
import { Roles } from 'src/app/shared-app/enums';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { InputQuestionComponent, InputQuestion } from '../../dynamic-form/questions/input-question.component';
import { SelectQuestionComponent, SelectQuestion } from '../../dynamic-form/questions/select-question.component';
import { isUniqueAsyncValidator } from '../../dynamic-form/validators/is-unique.async.validator';
import { SaveModelFormState } from '../../model-form';

export interface UserForm extends User {
    password?: string;
}

type FormState = SaveModelFormState & {roles: string[]};

const AvailableRoles = Object.keys(Roles).filter(x => x !== Roles.Leder).map(key => Roles[key] as string);

const UserNameControl = <DynamicControl<UserForm>>{ name: "userName", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Brukernavn"}, 
    }], 
    asyncStateValidators: [
        (s$: Observable<FormState>) => isUniqueAsyncValidator(s$.pipe(map(s => s?.foreigns?.users)), "userName")
    ],
    validators: [
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(4),
        Validators.maxLength(100)
    ] 
}
const FirstNameControl = <DynamicControl<UserForm>>{ name: "firstName", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Fornavn"}, 
    }], 
    validators: [Validators.maxLength(100)] 
}
const LastNameControl = <DynamicControl<UserForm>>{ name: "lastName", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Etternavn"}, 
    }], 
    validators: [Validators.maxLength(100)] 
}
const RoleControl = <DynamicControl<UserForm>>{ name: "role", required: true,
    type: "control", questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<string>>{
            placeholder: "Rolle",
            optionsGetter: (s: FormState) => AvailableRoles
        }, 
    }], 
    validators: [ Validators.maxLength(100)] 
}
const EmployerIdControl = <DynamicControl<UserForm>>{ name: "employerId", 
    type: "control", questions: [{
        component:  SelectQuestionComponent,
        hideOnValueChange: {controlName: "role", callback: (role: string) => role !== Roles.Oppdragsgiver},
        question: <SelectQuestion<Employer>>{
            placeholder: "Oppdragsgiver", valueProp: "id",
            valueFormatter: (val: Employer) => val.name, 
            optionsGetter: (s: FormState) => s.foreigns.employers,
        }, 
    }], 
    validators: [ Validators.maxLength(100)] 
}
const PhoneNumberControl = <DynamicControl<UserForm>>{ name: "phoneNumber", 
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Kontaktnummer"}, 
    }], 
    validators: [Validators.minLength(4), Validators.maxLength(12)] 
}
const EmailControl = <DynamicControl<UserForm>>{ name: "email", 
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Epost"}, 
    }], 
    validators: [Validators.email] 
}
const PasswordControl = <DynamicControl<UserForm>>{ name: "password", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Passord", hideable: true, defaultHidden: true}, 
    }], 
    validators: [Validators.minLength(7), Validators.maxLength(100)] 
}

export const CreateUserForm: DynamicForm<UserForm, FormState> = {
    submitText: "Legg til",
    controls: [
        UserNameControl,
        PasswordControl,
        FirstNameControl,
        LastNameControl,
        RoleControl,
        EmployerIdControl,
        PhoneNumberControl,
        EmailControl, 
    ],
}

export const EditUserForm: DynamicForm<UserForm, FormState> = {
    submitText: "Oppdater", getRawValue: true, disabledControls: {userName:true},
    controls: [ 
        {...UserNameControl, valueGetter: (s: UserForm) => s.userName},
        {...FirstNameControl, valueGetter: (s: UserForm) => s.firstName},
        {...LastNameControl, valueGetter: (s: UserForm) => s.lastName},
        {...RoleControl, valueGetter: (s: UserForm) => s.role},
        {...EmployerIdControl, valueGetter: (s: UserForm) => s.employerId},
        {...PhoneNumberControl, valueGetter: (s: UserForm) => s.phoneNumber},
        {...EmailControl, valueGetter: (s: UserForm) => s.email}, 
    ],
}

