import { Validators } from '@angular/forms';
import { MissionType } from 'src/app/core/models';
import { DynamicControl, DynamicForm } from '../dynamic-form/interfaces';
import { InputQuestion, InputQuestionComponent } from '../dynamic-form/questions/input-question.component';
import { SaveModelFormState } from '../model-form/interfaces';

type FormState = SaveModelFormState;

const NameControl = <DynamicControl<MissionType>>{ name: "name", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Navn"}, 
    }], 
    validators: [Validators.maxLength(45)] 
}

export const CreateMissionTypeForm: DynamicForm<MissionType, FormState> = {
    submitText: "Legg til", controls: [ NameControl ],
}