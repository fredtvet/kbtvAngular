import { Validators } from '@angular/forms';
import { MissionNote } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelConverter } from '@shared/action-converters/form-to-save-model.converter';
import { DynamicControl } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../scam/dynamic-form-questions/text-area-question.component';
import { HiddenIdControl, HiddenMissionIdControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

export type SaveMissionNoteForm = Pick<MissionNote, "title" | "content" | "missionId" | "id">;

const TitleControl = <Immutable<DynamicControl<SaveMissionNoteForm, "title">>>{ 
    type: "control", name: "title", 
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{placeholder: "Tittel"}, 
    validators: [Validators.maxLength(ValidationRules.MissionNoteTitleMaxLength)] 
}
const ContentControl = <Immutable<DynamicControl<SaveMissionNoteForm, "content">>>{ 
    type: "control", name: "content", required: true,     
    questionComponent: TextAreaQuestionComponent,
    question: <TextAreaQuestion>{placeholder: "Beskrivelse", rows: 4},  
    validators: [Validators.maxLength(ValidationRules.MissionNoteContentMaxLength)] 
}

export const CreateMissionNoteModelForm: Immutable<ModelFormConfig<ModelState, SaveMissionNoteForm, MissionNote>> = {
    includes: {prop: "missionNotes"},
    actionConverter: _formToSaveModelConverter,  
    dynamicForm: {
        submitText: "Legg til",
        controls: {
            title: TitleControl, 
            content: ContentControl, 
            missionId: HiddenMissionIdControl
        },
    }
}

export const EditMissionNoteModelForm: Immutable<ModelFormConfig<ModelState, SaveMissionNoteForm, MissionNote>> = {
    includes: {prop: "missionNotes"},
    actionConverter: _formToSaveModelConverter,
    dynamicForm: {
        submitText: "Oppdater",
        controls: {
            title: TitleControl, 
            content: ContentControl, 
            missionId: HiddenMissionIdControl,
            id: HiddenIdControl,
        },
    }
}