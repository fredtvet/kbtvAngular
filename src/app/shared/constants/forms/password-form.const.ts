import { Validators } from '@angular/forms';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { InputQuestionComponent, InputQuestion } from '../../dynamic-form/questions/input-question.component';

interface PasswordForm { newPassword: string, confirmPassword: string }

const NewPasswordControl = <DynamicControl<PasswordForm>>{ name: "newPassword", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{ 
            placeholder: "Nytt passord", type: "password", hideable: true, defaultHidden: true,
        }, 
    }],
    validators: [Validators.minLength(7)] 
}
const ConfirmPasswordControl = <DynamicControl<PasswordForm>>{ name: "confirmPassword", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{ 
            placeholder: "Gjenta nytt passord", type: "password", hideable: true, defaultHidden: true,
        }, 
    }],
}

export interface CurrentUserPasswordFormState extends PasswordForm { oldPassword: string }
export const CurrentUserPasswordForm: DynamicForm<CurrentUserPasswordFormState, any> = {
    submitText: "Oppdater", controls: [
        <DynamicControl<CurrentUserPasswordFormState>>{ name: "oldPassword", required: true,
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
    ],
}

export interface UserPasswordFormState extends PasswordForm { userName: string }
export const UserPasswordForm: DynamicForm<UserPasswordFormState,  any> = {
    submitText: "Oppdater", disabledControls: {userName: true},
    controls: [
        <DynamicControl<UserPasswordFormState>>{ name: "userName",
            type: "control", questions: [{
                component:  InputQuestionComponent,
                question: <InputQuestion>{placeholder: "Brukernavn"}, 
            }], 
        },
        NewPasswordControl,
        ConfirmPasswordControl,
    ],
}