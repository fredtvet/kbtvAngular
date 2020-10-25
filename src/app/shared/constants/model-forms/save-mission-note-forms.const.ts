import { Validators } from '@angular/forms';
import { MissionNote } from 'src/app/core/models';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { CheckboxQuestionComponent, CheckboxQuestion } from '../../dynamic-form/questions/checkbox-question.component';
import { InputQuestionComponent, InputQuestion } from '../../dynamic-form/questions/input-question.component';
import { TextAreaQuestionComponent, TextAreaQuestion } from '../../dynamic-form/questions/text-area-question.component';
import { SaveModelFormState } from '../../model-form';

type FormState = SaveModelFormState;

const TitleControl = <DynamicControl<MissionNote>>{ name: "title", 
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Tittel"}, 
    }], 
    validators: [Validators.maxLength(40)] 
}
const ContentControl = <DynamicControl<MissionNote>>{ name: "content", required: true,
    type: "control", questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse", minRows: 4}, 
    }], 
    validators: [Validators.maxLength(400)] 
}
const PinnedControl = <DynamicControl<MissionNote>>{ name: "pinned",
    type: "control", questions: [{
        component:  CheckboxQuestionComponent,
        question: <CheckboxQuestion>{text: "Viktig?", color:"primary"}, 
    }],
}
const MissionIdControl = <DynamicControl<MissionNote>>{ name: "missionId", required: true,
type: "control", valueGetter: (s: MissionNote) => s.missionId,         
}
const IdControl = <DynamicControl<MissionNote>>{ name: "id", required: true,
    type: "control", valueGetter: (s: MissionNote) => s.id,         
}

export const CreateMissionNoteForm: DynamicForm<MissionNote, FormState> = {
    submitText: "Legg til",
    controls: [
        TitleControl, 
        ContentControl, 
        PinnedControl, 
        MissionIdControl
    ],
}
export const EditMissionNoteForm: DynamicForm<MissionNote, FormState> = {
    submitText: "Oppdater",
    controls: [
        {...TitleControl, valueGetter: (s: MissionNote) => s.title}, 
        {...ContentControl, valueGetter: (s: MissionNote) => s.content}, 
        {...PinnedControl, valueGetter: (s: MissionNote) => s.pinned}, 
        MissionIdControl, 
        IdControl
    ],
}