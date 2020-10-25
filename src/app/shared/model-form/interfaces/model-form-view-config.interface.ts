import { Model } from 'src/app/core/models/base-entity.interface';
import { ModelState } from 'src/app/core/services/model/interfaces';

export interface ModelFormViewConfig<TModel extends Model, TFormState>{
    entity?: TModel;
    foreigns?: Partial<ModelState>;
    lockedValues?: Partial<TFormState>; 
}