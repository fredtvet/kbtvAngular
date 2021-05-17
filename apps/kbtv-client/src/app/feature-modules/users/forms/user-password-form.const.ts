import { UserNameControl, NewPasswordControl, ConfirmPasswordControl } from "@shared/constants/common-controls.const";
import { isSamePasswordsValidator } from "@shared/validators/is-same-passwords.validator";
import { DynamicForm } from "dynamic-forms";
import { Immutable } from "global-types";

export interface UserPasswordForm { userName: string, newPassword: string, confirmPassword: string }

export const UserPasswordForm: Immutable<DynamicForm<UserPasswordForm, null>> = {
    submitText: "Oppdater", options: {  onlineRequired: true, getRawValue: true,  },
    disabledControls: { userName: true }, 
    controls: {
        userName: UserNameControl,
        newPassword: NewPasswordControl,
        confirmPassword: ConfirmPasswordControl,
    },
    validators: [isSamePasswordsValidator<UserPasswordForm>("newPassword", "confirmPassword")],
}