import { ModelState } from '../../model.state';
import { Model } from '../../../models/base-entity.interface';

export interface ModelFormViewConfig<TModel extends Model, TFormState>{
    entity?: TModel;
    foreigns?: Partial<ModelState>;
    lockedValues?: Partial<TFormState>;
}