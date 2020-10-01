import { ModelFormConfig } from './model-form-config.interface';
import { ModelFormViewConfig } from './model-form-view-config.interface';
import { Model } from 'src/app/core/models';
import { Type } from '@angular/core';
import { BaseModelFormViewComponent } from '../abstracts/base-model-form-view.component';
import { SaveModelStateCommand } from '../../interfaces/save-model-state-command.interface';

export interface GenericModelFormConfig<
    TModel extends Model,
    TFormState, 
    TViewConfig extends ModelFormViewConfig<TModel, TFormState>
    // TViewConfig extends ModelFormViewConfig<TModel, TForm>, 
    // TResponse extends SaveModelStateCommand<TModel>
>  extends ModelFormConfig<TFormState, TModel, TViewConfig> {
    viewComponent: Type<BaseModelFormViewComponent<TFormState, TModel, ModelFormViewConfig<TModel, TFormState>, SaveModelStateCommand<TModel>>>
}