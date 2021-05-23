import { Validators } from '@angular/forms';
import { ConfirmPasswordControl, NewPasswordControl } from '@shared/constants/common-controls.const';
import { ValidationRules } from '@shared/constants/validation-rules.const';
import { InputQuestion, InputQuestionComponent } from '@shared/scam/dynamic-form-questions/input-question.component';
import { isSamePasswordsValidator } from '@shared/validators/is-same-passwords.validator';
import { DynamicForm } from 'dynamic-forms';
import { FormSheetViewConfig } from 'form-sheet';
import { Immutable } from 'global-types';

export interface CurrentUserPasswordForm { oldPassword: string, newPassword: string, confirmPassword: string }

export const CurrentUserPasswordForm: Immutable<DynamicForm<CurrentUserPasswordForm, null>> = {
    submitText: "Oppdater", options: { onlineRequired: true },    
    validators: [isSamePasswordsValidator<CurrentUserPasswordForm>("newPassword", "confirmPassword")],
    controls: {
        oldPassword: { 
            required: true,
            questionComponent:  InputQuestionComponent,
            question: <InputQuestion>{ 
                placeholder: "Nåværende passord", type: "password", hideable: true, defaultHidden: true,
            }, 
            validators: [
                Validators.minLength(ValidationRules.UserPasswordMinLength),
                Validators.maxLength(ValidationRules.UserPasswordMaxLength)
            ] 
        },
        newPassword: NewPasswordControl,
        confirmPassword: ConfirmPasswordControl
    }, 
}

export const CurrentUserPasswordFormSheet: Immutable<FormSheetViewConfig<CurrentUserPasswordForm>> = {
    formConfig: CurrentUserPasswordForm, 
    navConfig: {title: "Oppdater passord"},
  }