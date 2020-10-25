import { Validators } from '@angular/forms';
import { AppDocumentType } from 'src/app/core/models';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { InputQuestionComponent, InputQuestion } from '../../dynamic-form/questions/input-question.component';
import { SaveModelFormState } from '../../model-form';

type FormState = SaveModelFormState;

const NameControl = <DynamicControl<AppDocumentType>>{ name: "name", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Navn"}, 
    }], 
    validators: [Validators.maxLength(45)] 
}

export const CreateDocumentTypeForm: DynamicForm<AppDocumentType, FormState> = {
    submitText: "Legg til", controls: [NameControl],
}