import { MissionDocument } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelFileConverter } from '@shared/action-converters/form-to-save-model-file.converter';
import { fileExtensionValidator } from '@shared/validators/file-extension.validator';
import { fileSizeValidator } from '@shared/validators/file-size.validator';
import { DynamicControl } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { FileQuestionComponent } from '../../scam/dynamic-form-questions/file-question.component';
import { HiddenMissionIdControl, NameControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

export interface MissionDocumentForm extends Partial<MissionDocument>{
    missionId: string;
    name: string;
    file: File;
}

const FileControl = <Immutable<DynamicControl<MissionDocumentForm, {}>>>{ name: "file", required: true,
    type: "control", questions: [{
        component:  FileQuestionComponent, question: {}
    }],
    validators: [
        fileExtensionValidator(ValidationRules.MissionDocumentFileExtensions),
        fileSizeValidator(ValidationRules.ContentMaxByteLength)
    ]
}

export const CreateMissionDocumentModelForm: Immutable<ModelFormConfig<ModelState, MissionDocumentForm>> = {
    includes: {prop: "missionDocuments"},
    actionConverter: _formToSaveModelFileConverter,
    dynamicForm: {
        submitText: "Legg til",
        controls: [{...NameControl, required: true}, FileControl, HiddenMissionIdControl],
    }
}