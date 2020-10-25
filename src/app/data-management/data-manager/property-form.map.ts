import { CreateDocumentTypeForm } from 'src/app/shared/constants/model-forms/create-document-type-form.const';
import { CreateEmployerForm } from 'src/app/shared/constants/model-forms/create-employer-form.const';
import { CreateInboundEmailPasswordForm } from 'src/app/shared/constants/model-forms/create-inbound-email-password-form.const';
import { CreateMissionTypeForm } from 'src/app/shared/constants/model-forms/create-mission-type-form.const';
import { CreateMissionForm } from 'src/app/shared/constants/model-forms/save-mission-forms.const';
import { DynamicForm } from 'src/app/shared/dynamic-form/interfaces';
import { SaveModelFormState } from 'src/app/shared/model-form';

export const PropertyFormMap: {[key: string]: DynamicForm<any, SaveModelFormState> } = {
    "employers": CreateEmployerForm,
    "documentTypes": CreateDocumentTypeForm,
    "missionTypes": CreateMissionTypeForm,
    "inboundEmailPasswords": CreateInboundEmailPasswordForm,
    "missions": CreateMissionForm,
}