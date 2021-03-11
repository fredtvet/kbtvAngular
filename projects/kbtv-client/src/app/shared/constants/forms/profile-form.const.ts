import { User } from '@core/models';
import { DynamicForm } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { EmailControl, FirstNameControl, LastNameControl, PhoneNumberControl, UserNameControl } from '../common-controls.const';

export const ProfileForm: Immutable<DynamicForm<User, unknown>> = {
    submitText: "Oppdater", getRawValue: true, onlineRequired: true,
    disabledControls: {userName: true, firstName: true, lastName: true},
    controls: [
        {...UserNameControl, required: true},
        {...FirstNameControl, required: true},
        {...LastNameControl, required: true},
        PhoneNumberControl,
        EmailControl,
    ],
}