import { Validators } from '@angular/forms';
import { Employer, User } from '@core/models';
import { StateEmployers, StateUsers } from '@core/state/global-state.interfaces';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { isUniqueAsyncValidator } from '@shared/validators/is-unique.async.validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';
import { SelectQuestion, SelectQuestionComponent } from '../../scam/dynamic-form-questions/select-question.component';
import { EmailControl, EmployerSelectControl, FirstNameControl, LastNameControl, PhoneNumberControl, UserNameControl } from '../common-controls.const';
import { Roles } from '@core/roles.enum';
import { Immutable } from 'global-types';
import { ModelState } from '@core/state/model-state.interface';
import { ModelFormConfig } from 'model/form';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { _userFormToSaveUserConverter } from 'src/app/feature-modules/users/save-user/user-form-to-save-user.converter';

export interface UserForm extends User { password?: string; }

type FormState = OptionsFormState<StateUsers & StateEmployers>;

const AvailableRoles = Object.keys(Roles).filter(x => x !== Roles.Leder).map(key => Roles[key as keyof typeof Roles]);

const UniqueUserNameControl = <Immutable<DynamicControl<UserForm, StateUsers>>>{...UserNameControl, required: true,     
    asyncStateValidators: [
    (s$: Observable<FormState>) => 
        isUniqueAsyncValidator<User>(s$.pipe(map(s => s?.options?.users)), (x, y) => x.userName.toLowerCase() === y.toLowerCase())
    ],
}
const RoleControl = <Immutable<DynamicControl<UserForm, StateUsers>>>{ name: "role", required: true,
    type: "control", valueGetter: (s: UserForm) => s?.role, questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<string>>{
            placeholder: "Rolle",
            lazyOptions: "all",
            optionsGetter: () => AvailableRoles
        }, 
    }], 
    validators: [ Validators.maxLength(100)] 
}
const PasswordControl = <Immutable<DynamicControl<UserForm, FormState>>>{ name: "password", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Passord", hideable: true, defaultHidden: true}, 
    }], 
    validators: [Validators.minLength(7), Validators.maxLength(100)] 
}
const EmployerControl = <Immutable<DynamicControl<{employer: Employer}, OptionsFormState<FormState>>>>{
    ...EmployerSelectControl, 
    questions: [{...(EmployerSelectControl.questions ? EmployerSelectControl.questions[0] : null), 
        hideOnValueChange: {controlName: "role", callback: (role: string) => role !== Roles.Oppdragsgiver}}]
}

export const CreateUserModelForm: Immutable<ModelFormConfig<ModelState, UserForm, FormState>> = {
    includes: {prop: "users", foreigns: "all"},
    actionConverter: _userFormToSaveUserConverter,
    dynamicForm: {
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
}

export const EditUserModelForm: Immutable<ModelFormConfig<ModelState, UserForm, FormState>> = {
    includes: {prop: "users", foreigns: "all"},
    actionConverter: _userFormToSaveUserConverter,
    dynamicForm: {
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
}
