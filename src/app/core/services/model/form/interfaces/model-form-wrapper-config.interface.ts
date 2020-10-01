import { Model } from 'src/app/core/models/base-entity.interface';
import { FormSheetWrapperConfig } from '../../../form/interfaces/form-sheet-wrapper-config.interface';
import { SaveModelStateCommand } from '../../interfaces/save-model-state-command.interface';
import { BaseModelFormComponent } from '../abstracts/base-model-form.component';
import { ModelFormConfig } from './model-form-config.interface';
import { ModelFormViewConfig } from './model-form-view-config.interface';

export interface ModelFormWrapperConfig
    <TFormConfig extends ModelFormConfig<any, Model, ModelFormViewConfig<Model, any>>>
    extends FormSheetWrapperConfig<TFormConfig, BaseModelFormComponent<Model, any, SaveModelStateCommand<Model>, any, TFormConfig, any>>{      
    deleteDisabled?: boolean;
}