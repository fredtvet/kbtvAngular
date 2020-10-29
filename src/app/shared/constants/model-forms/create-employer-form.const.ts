import { Employer } from 'src/app/core/models';
import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { EmailControl, GoogleAddressControl, NameControl, PhoneNumberControl } from '../common-controls.const';

export const CreateEmployerForm: DynamicForm<Employer, any> = {
    submitText: "Legg til",
    controls: [
        {...NameControl, required: true}, 
        PhoneNumberControl, 
        GoogleAddressControl, 
        EmailControl
    ],
}