import { Validators } from '@angular/forms';
import { MissionNote } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { DynamicControl } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../scam/dynamic-form-questions/text-area-question.component';
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

export const CreateMissionNoteModelForm: Immutable<ModelFormConfig<ModelState, MissionNote>> = {
    includes: {prop: "missionNotes"},
    actionConverter: _formToSaveModelConverter,
    dynamicForm: {
        submitText: "Legg til",
        controls: [
            TitleControl, 
            ContentControl, 
            HiddenMissionIdControl
        ],
    }
}

export const EditMissionNoteModelForm: Immutable<ModelFormConfig<ModelState, MissionNote>> = {
    includes: {prop: "missionNotes"},
    actionConverter: _formToSaveModelConverter,
    dynamicForm: {
        submitText: "Oppdater",
        controls: [
            ...CreateMissionNoteModelForm.dynamicForm.controls,
            HiddenIdControl
        ],
    }
}