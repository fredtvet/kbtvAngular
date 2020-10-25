import { Validators } from '@angular/forms';
import { DynamicControl, DynamicForm } from '../dynamic-form/interfaces';
import { InputQuestion, InputQuestionComponent } from '../dynamic-form/questions/input-question.component';

export interface EmailForm { email: string };

export const EmailForm: DynamicForm<EmailForm, any> = {
    submitText: "Send", controls: [
        <DynamicControl<EmailForm>>{ name: "email", required: true,
            valueGetter: (s: EmailForm) => s.email,
            type: "control", questions: [{
                component:  InputQuestionComponent,
                question: <InputQuestion>{placeholder: "Epost"}, 
            }], 
            validators: [Validators.email] 
        }
    ],
}