import { Model } from 'src/app/core/models/base-entity.interface';
import { FormSheetWrapperConfig } from '../../../form/interfaces/form-sheet-wrapper-config.interface';
import { ModelFormComponent } from '../components/model-form.component';
import { ModelFormConfig } from './model-form-config.interface';
import { ModelFormViewConfig } from './model-form-view-config.interface';

export interface ModelFormWrapperConfig<
    TFormConfig extends ModelFormConfig<any, 
    Model,
    ModelFormViewConfig<Model, any>>
    > extends FormSheetWrapperConfig<TFormConfig,  ModelFormComponent>{    

    deleteDisabled?: boolean;
}