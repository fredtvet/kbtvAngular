import { MissionDocument } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelFileConverter } from '@shared/constants/form-to-save-model-file.converter';
import { fileExtensionValidator } from '@shared/validators/file-extension.validator';
import { fileSizeValidator } from '@shared/validators/file-size.validator';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { FileQuestionComponent } from '@shared/scam/dynamic-form-questions/file-question.component';
import { NameControl } from '@shared/constants/common-controls.const';
import { ValidationRules } from '@shared-app/constants/validation-rules.const';

export interface CreateMissionDocumentForm extends Pick<MissionDocument, "name" | "missionId">{
    file: File;
}

export const CreateMissionDocumentModelForm: Immutable<ModelFormConfig<ModelState, MissionDocument, CreateMissionDocumentForm>> = {
    includes: {prop: "missionDocuments"}, 
    actionConverter: _formToSaveModelFileConverter,
    dynamicForm: {
        submitText: "Legg til",
        controls: { 
            missionId:  { required: true, questionComponent: null },
            name: {...NameControl, required: true}, 
            file: { required: true,
                questionComponent: FileQuestionComponent, 
                validators: [
                    fileExtensionValidator(ValidationRules.MissionDocumentFileExtensions),
                    fileSizeValidator(ValidationRules.ContentMaxByteLength)
                ]
            },
        },
    }
}