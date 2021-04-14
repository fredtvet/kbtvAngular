import { Validators } from '@angular/forms';
import { InboundEmailPassword } from '@core/models';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { Immutable, UnknownState } from 'global-types';
import { InputQuestionComponent, InputQuestion } from '../../scam/dynamic-form-questions/input-question.component';

const PasswordControl = <Immutable<DynamicControl<InboundEmailPassword>>>{ name: "password", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Epostpassord"}, 
    }], 
    validators: [Validators.maxLength(250)] 
}

export const CreateInboundEmailPasswordForm: Immutable<DynamicForm<InboundEmailPassword, UnknownState>> = {
    submitText: "Legg til",
    controls: [PasswordControl],
}