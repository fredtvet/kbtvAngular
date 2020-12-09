import { Validators } from '@angular/forms';
import { AppDocumentType, MissionDocument } from '@core/models';
import { StateDocumentTypes } from '@core/state/global-state.interfaces';
import { DynamicControlGroup, DynamicControl, DynamicForm } from '@dynamic-forms/interfaces';
import { OptionsFormState } from '@shared/form';
import { AutoCompleteQuestionComponent } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { FileQuestionComponent } from '../../components/dynamic-form-questions/file-question.component';
import { fileExtensionValidator } from '../../form/validators/file-extension.validator';
import { HiddenMissionIdControl } from '../common-controls.const';
import { DocumentFileExtensions } from '../document-file-extensions.const';

type FormState = OptionsFormState<StateDocumentTypes>;

export interface MissionDocumentForm extends Partial<MissionDocument>{
    missionId: string;
    documentType: AppDocumentType;
    file: File;
}

const DocumentTypeControl = <DynamicControlGroup<MissionDocumentForm>>{ name: "documentType",
    type: "group", controls: [
    <DynamicControl<AppDocumentType>>{ name: "name", required: true,
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<AppDocumentType>>{
                optionsGetter: (state: FormState) => state.options.documentTypes,
                placeholder: "Velg type dokument",
                valueProp: "name",
                valueFormatter: (val: AppDocumentType) => val.name, 
                resetable: true,
                activeFilter: { stringProps: ["name"] }
            }, 
        }], 
        validators: [Validators.maxLength(45)]
    }],
}
const FileControl = <DynamicControl<MissionDocumentForm>>{ name: "file", required: true,
    type: "control", questions: [{
        component:  FileQuestionComponent, question: {}
    }],
    validators: [fileExtensionValidator(DocumentFileExtensions)]
}

export const CreateMissionDocumentForm: DynamicForm<MissionDocumentForm, FormState> = {
    submitText: "Legg til",
    controls: [DocumentTypeControl, FileControl, HiddenMissionIdControl],
}