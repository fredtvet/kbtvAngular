import { ModelState } from '@core/state/model-state.interface';
import { CreateEmployerModelForm } from '@shared/constants/model-forms/create-employer-form.const';
import { CreateInboundEmailPasswordModelForm } from '@shared/constants/model-forms/create-inbound-email-password-form.const';
import { CreateMissionTypeModelForm } from '@shared/constants/model-forms/create-mission-type-form.const';
import { CreateMissionModelForm } from '@shared/constants/model-forms/save-mission-forms.const';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';

export const PropertyFormMap: {[key: string]: Immutable<ModelFormConfig<ModelState, object>> } = {
    "employers": CreateEmployerModelForm,
    "missionTypes": CreateMissionTypeModelForm,
    "inboundEmailPasswords": CreateInboundEmailPasswordModelForm,
    "missions": CreateMissionModelForm,
}
