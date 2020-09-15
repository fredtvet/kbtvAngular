import { ModelFormViewConfig } from './model-form-view-config.interface';
import { Model } from '../../../models';

export interface ModelFormConfig<TFormState, TModel extends Model, TViewConfig extends ModelFormViewConfig<TModel, TFormState>> {      
    entityId?: any;
    stateProp: string;
    viewConfig?: TViewConfig
}