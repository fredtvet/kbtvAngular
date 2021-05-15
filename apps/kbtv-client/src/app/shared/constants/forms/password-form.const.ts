import { Validators } from '@angular/forms';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { isSamePasswordsValidator } from '@shared/validators/is-same-passwords.validator';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';
import { UserNameControl } from '../common-controls.const';
import { Immutable } from 'global-types';

export interface PasswordForm { newPassword: string, confirmPassword: string }

export interface CurrentUserPasswordForm extends PasswordForm { oldPassword: string }

export interface UserPasswordForm extends PasswordForm { userName: string }

const NewPasswordControl: Immutable<DynamicControl<string, null, InputQuestion>> = { 
    required: true, questionComponent:  InputQuestionComponent,
    question: { 
        placeholder: "Nytt passord", type: "password", hideable: true, defaultHidden: true,
    },
    validators: [Validators.minLength(7)] 
}
const ConfirmPasswordControl: Immutable<DynamicControl<string, null, InputQuestion>> = { 
    required: true, questionComponent:  InputQuestionComponent,
    question: { 
        placeholder: "Gjenta nytt passord", type: "password", hideable: true, defaultHidden: true,
    }, 
}

export const CurrentUserPasswordForm: Immutable<DynamicForm<CurrentUserPasswordForm, null>> = {
    submitText: "Oppdater", options: { onlineRequired: true },    
    validators: [isSamePasswordsValidator("newPassword", "confirmPassword")],
    controls: {
        oldPassword: { 
            required: true,
            questionComponent:  InputQuestionComponent,
            question: <InputQuestion>{ 
                placeholder: "Nåværende passord", type: "password", hideable: true, defaultHidden: true,
            }, 
            validators: [Validators.minLength(7)] 
        },
        newPassword: NewPasswordControl,
        confirmPassword: ConfirmPasswordControl
    }, 
}

export const UserPasswordForm: Immutable<DynamicForm<UserPasswordForm, null>> = {
    submitText: "Oppdater", options: {  onlineRequired: true, getRawValue: true,  },
    disabledControls: { userName: true }, 
    controls: {
        userName: UserNameControl,
        newPassword: NewPasswordControl,
        confirmPassword: ConfirmPasswordControl,
    },
    validators: [isSamePasswordsValidator<PasswordForm>("newPassword", "confirmPassword")],
}