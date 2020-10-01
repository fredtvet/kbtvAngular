import { Model } from 'src/app/core/models/base-entity.interface';
import { FormComponent } from '../../../form/interfaces/form-component.interface';
import { ModelFormConfig } from './model-form-config.interface';
import { ModelFormViewConfig } from './model-form-view-config.interface';

export interface ModelForm<TFormState> extends FormComponent{
    config: ModelFormConfig<TFormState, Model, ModelFormViewConfig<Model, TFormState>>
}