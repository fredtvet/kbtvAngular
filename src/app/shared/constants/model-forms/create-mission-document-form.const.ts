import { Validators } from '@angular/forms';
import { AppDocumentType, MissionDocument } from 'src/app/core/models';
import { DynamicControlGroup, DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { AutoCompleteQuestionComponent } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.interface';
import { FileQuestionComponent } from '../../dynamic-form/questions/file-question.component';
import { fileExtensionValidator } from '../../form/validators/file-extension.validator';
import { SaveModelFormState } from '../../model-form';
import { DocumentFileExtensions } from '../document-file-extensions.const';

type FormState = SaveModelFormState;

export interface MissionDocumentFormState extends Partial<MissionDocument>{
    missionId: string;
    documentType: AppDocumentType;
    file: File;
}

const DocumentTypeControl = <DynamicControlGroup<MissionDocumentFormState>>{ name: "documentType",
    type: "group", controls: [
    <DynamicControl<AppDocumentType>>{ name: "name", required: true,
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<AppDocumentType>>{
                optionsGetter: (state: FormState) => state.foreigns.documentTypes,
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
const FileControl = <DynamicControl<MissionDocumentFormState>>{ name: "file", required: true,
    type: "control", questions: [{
        component:  FileQuestionComponent, question: {}
    }],
    validators: [fileExtensionValidator(DocumentFileExtensions)]
}
const MissionIdControl = <DynamicControl<MissionDocumentFormState>>{ name: "missionId", required: true,
    type: "control", valueGetter: (s: MissionDocumentFormState) => s.missionId
} 

export const CreateMissionDocumentForm: DynamicForm<MissionDocumentFormState, FormState> = {
    submitText: "Legg til",
    controls: [DocumentTypeControl, FileControl, MissionIdControl],
}