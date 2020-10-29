import { User } from 'src/app/core/models';
import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { EmailControl, FirstNameControl, LastNameControl, PhoneNumberControl, UserNameControl } from '../common-controls.const';

export const ProfileForm: DynamicForm<User, any> = {
    submitText: "Oppdater", getRawValue: true,
    disabledControls: {userName: true, firstName: true, lastName: true},
    controls: [
        {...UserNameControl, required: true},
        {...FirstNameControl, required: true},
        {...LastNameControl, required: true},
        PhoneNumberControl,
        EmailControl,
    ],
}