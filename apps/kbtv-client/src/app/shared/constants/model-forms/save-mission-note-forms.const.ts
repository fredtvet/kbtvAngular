import { Validators } from '@angular/forms';
import { MissionNote } from '@core/models';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { InputQuestionComponent, InputQuestion } from '../../scam/dynamic-form-questions/input-question.component';
import { TextAreaQuestionComponent, TextAreaQuestion } from '../../scam/dynamic-form-questions/text-area-question.component';
import { HiddenIdControl, HiddenMissionIdControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

const TitleControl = <Immutable<DynamicControl<MissionNote>>>{ name: "title", 
    type: "control", valueGetter: (s: MissionNote) => s?.title, questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Tittel"}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionNoteTitleMaxLength)] 
}
const ContentControl = <Immutable<DynamicControl<MissionNote>>>{ name: "content", required: true,
    type: "control", valueGetter: (s: MissionNote) => s?.content, questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse", rows: 4}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionNoteContentMaxLength)] 
}

export const CreateMissionNoteForm: Immutable<DynamicForm<MissionNote, {}>> = {
    submitText: "Legg til",
    controls: [
        TitleControl, 
        ContentControl, 
        HiddenMissionIdControl
    ],
}

export const EditMissionNoteForm: Immutable<DynamicForm<MissionNote, {}>> = {
    submitText: "Oppdater",
    controls: [
        ...CreateMissionNoteForm.controls,
        HiddenIdControl
    ],
}