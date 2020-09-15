import { Type } from '@angular/core';
import { Model } from '../../../models/base-entity.interface';
import { SaveModelStateCommand } from '../../interfaces/save-model-state-command.interface';
import { BaseModelFormComponent } from '../abstracts/base-model-form.component';
import { ModelFormConfig } from './model-form-config.interface';
import { FormSheetWrapperConfig } from 'src/app/core/form/form-sheet-wrapper-config.interface';
import { ModelFormViewConfig } from './model-form-view-config.interface';

export interface ModelFormWrapperConfig
    <TFormConfig extends ModelFormConfig<any, Model, ModelFormViewConfig<Model, any>>>
    extends FormSheetWrapperConfig<TFormConfig, BaseModelFormComponent<Model, any, SaveModelStateCommand<Model>, any, TFormConfig, any>>{      
    deleteDisabled?: boolean;
}