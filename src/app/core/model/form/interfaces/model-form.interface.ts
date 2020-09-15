import { ModelFormConfig } from './model-form-config.interface';
import { Model } from '../../../models';
import { ModelFormViewConfig } from './model-form-view-config.interface';
import { FormComponent } from 'src/app/core/form/form-component.interface';

export interface ModelForm<TFormState> extends FormComponent{
    config: ModelFormConfig<TFormState, Model, ModelFormViewConfig<Model, TFormState>>
}