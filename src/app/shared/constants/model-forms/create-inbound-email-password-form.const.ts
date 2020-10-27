import { Validators } from '@angular/forms';
import { InboundEmailPassword } from 'src/app/core/models';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { InputQuestion, InputQuestionComponent } from '../../dynamic-form/questions/input-question.component';

const PasswordControl = <DynamicControl<InboundEmailPassword, any>>{ name: "password", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Epostpassord"}, 
    }], 
    validators: [Validators.maxLength(250)] 
}

export const CreateInboundEmailPasswordForm: DynamicForm<InboundEmailPassword, any> = {
    submitText: "Legg til",
    controls: [PasswordControl],
}