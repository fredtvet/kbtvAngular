import { Validators } from '@angular/forms';
import { MissionNote } from '@core/models';
import { DynamicControl, DynamicForm } from '@dynamic-forms/interfaces';
import { InputQuestionComponent, InputQuestion } from '../../components/dynamic-form-questions/input-question.component';
import { TextAreaQuestionComponent, TextAreaQuestion } from '../../components/dynamic-form-questions/text-area-question.component';
import { HiddenIdControl, HiddenMissionIdControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

const TitleControl = <DynamicControl<MissionNote>>{ name: "title", 
    type: "control", valueGetter: (s: MissionNote) => s?.title, questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Tittel"}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionNoteTitleMaxLength)] 
}
const ContentControl = <DynamicControl<MissionNote>>{ name: "content", required: true,
    type: "control", valueGetter: (s: MissionNote) => s?.content, questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse", minRows: 4}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionNoteContentMaxLength)] 
}

export const CreateMissionNoteForm: DynamicForm<MissionNote, any> = {
    submitText: "Legg til",
    controls: [
        TitleControl, 
        ContentControl, 
        HiddenMissionIdControl
    ],
}

export const EditMissionNoteForm: DynamicForm<MissionNote, any> = {
    submitText: "Oppdater",
    controls: [
        ...CreateMissionNoteForm.controls,
        HiddenIdControl
    ],
}