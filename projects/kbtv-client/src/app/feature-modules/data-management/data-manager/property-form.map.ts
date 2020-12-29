import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from '@form-sheet/interfaces';
import { CreateDocumentTypeForm } from '@shared/constants/model-forms/create-document-type-form.const';
import { CreateEmployerForm } from '@shared/constants/model-forms/create-employer-form.const';
import { CreateInboundEmailPasswordForm } from '@shared/constants/model-forms/create-inbound-email-password-form.const';
import { CreateMissionTypeForm } from '@shared/constants/model-forms/create-mission-type-form.const';
import { CreateMissionForm } from '@shared/constants/model-forms/save-mission-forms.const';

export const PropertyFormMap: {[key: string]: DynamicForm<Model, OptionsFormState<ModelState>> } = {
    "employers": CreateEmployerForm,
    "documentTypes": CreateDocumentTypeForm,
    "missionTypes": CreateMissionTypeForm,
    "inboundEmailPasswords": CreateInboundEmailPasswordForm,
    "missions": CreateMissionForm,
}