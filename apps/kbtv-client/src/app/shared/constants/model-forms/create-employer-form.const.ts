import { Employer } from '@core/models';
import { _googleAddressFormatter } from '@shared-app/helpers/google-address-formatter.helper';
import { DynamicForm } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { EmailControl, GoogleAddressControl, NameControl, PhoneNumberControl } from '../common-controls.const';

export const CreateEmployerForm: Immutable<DynamicForm<Employer, unknown>> = {
    submitText: "Legg til",
    controls: [
        {...NameControl, required: true}, 
        PhoneNumberControl, 
        GoogleAddressControl, 
        EmailControl
    ],
    onSubmitFormatter: _googleAddressFormatter
}