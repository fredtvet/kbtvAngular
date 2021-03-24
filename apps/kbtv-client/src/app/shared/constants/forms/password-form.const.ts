import { Validators } from '@angular/forms';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { isSamePasswordsValidator } from '@shared/validators/is-same-passwords.validator';
import { InputQuestion, InputQuestionComponent } from '../../components/dynamic-form-questions/input-question.component';
import { UserNameControl } from '../common-controls.const';
import { Immutable } from 'global-types';

interface PasswordForm { newPassword: string, confirmPassword: string }

const NewPasswordControl: Immutable<DynamicControl<PasswordForm>> = { 
    name: "newPassword", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{ 
            placeholder: "Nytt passord", type: "password", hideable: true, defaultHidden: true,
        }, 
    }],
    validators: [Validators.minLength(7)] 
}
const ConfirmPasswordControl: Immutable<DynamicControl<PasswordForm>> = { 
    name: "confirmPassword", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{ 
            placeholder: "Gjenta nytt passord", type: "password", hideable: true, defaultHidden: true,
        }, 
    }],
}

export interface CurrentUserPasswordForm extends PasswordForm { oldPassword: string }
export const CurrentUserPasswordForm: Immutable<DynamicForm<CurrentUserPasswordForm, unknown>> = {
    submitText: "Oppdater",  onlineRequired: true, controls: [
        <DynamicControl<CurrentUserPasswordForm>>{ 
            name: "oldPassword", required: true,
            type: "control", questions: [{
                component:  InputQuestionComponent,
                question: <InputQuestion>{ 
                    placeholder: "Nåværende passord", type: "password", hideable: true, defaultHidden: true,
                }, 
            }],
            validators: [Validators.minLength(7)] 
        },
        NewPasswordControl,
        ConfirmPasswordControl
    ], validators: [isSamePasswordsValidator<PasswordForm>("newPassword", "confirmPassword")],
}

export interface UserPasswordForm extends PasswordForm { userName: string }
export const UserPasswordForm: Immutable<DynamicForm<UserPasswordForm,  unknown>> = {
    submitText: "Oppdater", onlineRequired: true, disabledControls: {userName: true}, getRawValue: true,
    controls: [
        UserNameControl,
        NewPasswordControl,
        ConfirmPasswordControl,
    ],
    validators: [isSamePasswordsValidator<PasswordForm>("newPassword", "confirmPassword")],
}