import { User } from '@core/models';
import { IContactable } from '@core/models/sub-interfaces/icontactable.interface';
import { IFullName } from '@core/models/sub-interfaces/ifullname.interface';
import { DynamicForm } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { EmailControl, FirstNameControl, LastNameControl, PhoneNumberControl, UserNameControl } from '../common-controls.const';

export interface ProfileForm extends Pick<User, "userName">, IContactable, IFullName {}

export const ProfileForm: Immutable<DynamicForm<ProfileForm, null>> = {
    submitText: "Oppdater", options: { getRawValue: true, onlineRequired: true, },
    disabledControls: {userName: true, firstName: true, lastName: true},
    controls: {
        userName: {...UserNameControl, required: true},
        firstName: {...FirstNameControl, required: true},
        lastName: {...LastNameControl, required: true},
        phoneNumber: PhoneNumberControl,
        email: EmailControl,
    },
}