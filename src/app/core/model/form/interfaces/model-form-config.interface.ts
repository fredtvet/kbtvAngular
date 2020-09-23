import { ModelFormViewConfig } from './model-form-view-config.interface';
import { Model } from '../../../models';
import { ModelState } from '../../model.state';
import { Prop } from '../../state.types';

export interface ModelFormConfig<TFormState, TModel extends Model, TViewConfig extends ModelFormViewConfig<TModel, TFormState>> {      
    entityId?: any;
    stateProp: Prop<ModelState>;
    viewConfig?: TViewConfig
}