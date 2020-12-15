import { Employer } from '@core/models';
import { DynamicForm } from '@dynamic-forms/interfaces';
import { EmailControl, GoogleAddressControl, NameControl, PhoneNumberControl } from '../common-controls.const';

export const CreateEmployerForm: DynamicForm<Employer, unknown> = {
    submitText: "Legg til",
    controls: [
        {...NameControl, required: true}, 
        PhoneNumberControl, 
        GoogleAddressControl, 
        EmailControl
    ],
}