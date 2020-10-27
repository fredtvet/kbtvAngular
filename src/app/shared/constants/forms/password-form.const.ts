import { Validators } from '@angular/forms';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { InputQuestionComponent, InputQuestion } from '../../dynamic-form/questions/input-question.component';
import { isSamePasswordsValidator } from '../../form/validators/is-same-passwords.validator';
import { UserNameControl } from '../common-controls.const';

interface PasswordForm { newPassword: string, confirmPassword: string }

export interface CurrentUserPasswordFormState extends PasswordForm { oldPassword: string }

const NewPasswordControl = <DynamicControl<PasswordForm, any>>{ name: "newPassword", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{ 
            placeholder: "Nytt passord", type: "password", hideable: true, defaultHidden: true,
        }, 
    }],
    validators: [Validators.minLength(7)] 
}
const ConfirmPasswordControl = <DynamicControl<PasswordForm, any>>{ name: "confirmPassword", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{ 
            placeholder: "Gjenta nytt passord", type: "password", hideable: true, defaultHidden: true,
        }, 
    }],
}

export const CurrentUserPasswordForm: DynamicForm<CurrentUserPasswordFormState, any> = {
    submitText: "Oppdater", controls: [
        <DynamicControl<CurrentUserPasswordFormState, any>>{ name: "oldPassword", required: true,
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

export interface UserPasswordFormState extends PasswordForm { userName: string }
export const UserPasswordForm: DynamicForm<UserPasswordFormState,  any> = {
    submitText: "Oppdater", disabledControls: {userName: true},
    controls: [
        UserNameControl,
        NewPasswordControl,
        ConfirmPasswordControl,
    ],
}