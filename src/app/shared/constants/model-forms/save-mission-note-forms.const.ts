import { Validators } from '@angular/forms';
import { MissionNote } from 'src/app/core/models';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { CheckboxQuestion, CheckboxQuestionComponent } from '../../dynamic-form/questions/checkbox-question.component';
import { InputQuestion, InputQuestionComponent } from '../../dynamic-form/questions/input-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../dynamic-form/questions/text-area-question.component';
import { HiddenIdControl, HiddenMissionIdControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

const TitleControl = <DynamicControl<MissionNote, any>>{ name: "title", 
    type: "control", valueGetter: (s: MissionNote) => s?.title, questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Tittel"}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionNoteTitleMaxLength)] 
}
const ContentControl = <DynamicControl<MissionNote, any>>{ name: "content", required: true,
    type: "control", valueGetter: (s: MissionNote) => s?.content, questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse", minRows: 4}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionNoteContentMaxLength)] 
}
const PinnedControl = <DynamicControl<MissionNote, any>>{ name: "pinned",
    type: "control", valueGetter: (s: MissionNote) => s?.pinned, questions: [{
        component:  CheckboxQuestionComponent,
        question: <CheckboxQuestion>{text: "Viktig?"}, 
    }],
}

export const CreateMissionNoteForm: DynamicForm<MissionNote, any> = {
    submitText: "Legg til",
    controls: [
        TitleControl, 
        ContentControl, 
        PinnedControl, 
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