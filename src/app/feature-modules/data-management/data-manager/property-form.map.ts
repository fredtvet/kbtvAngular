import { DynamicForm } from '@dynamic-forms/interfaces';
import { ModelState } from '@model/interfaces';
import { CreateDocumentTypeForm } from '@shared/constants/model-forms/create-document-type-form.const';
import { CreateEmployerForm } from '@shared/constants/model-forms/create-employer-form.const';
import { CreateInboundEmailPasswordForm } from '@shared/constants/model-forms/create-inbound-email-password-form.const';
import { CreateMissionTypeForm } from '@shared/constants/model-forms/create-mission-type-form.const';
import { CreateMissionForm } from '@shared/constants/model-forms/save-mission-forms.const';
import { SaveModelFormState } from '@shared/model-form';

export const PropertyFormMap: {[key: string]: DynamicForm<any, SaveModelFormState<Partial<ModelState>>> } = {
    "employers": CreateEmployerForm,
    "documentTypes": CreateDocumentTypeForm,
    "missionTypes": CreateMissionTypeForm,
    "inboundEmailPasswords": CreateInboundEmailPasswordForm,
    "missions": CreateMissionForm,
}