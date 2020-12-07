import { Model } from '@core/models/base-entity.interface';
import { ModelState } from '@model/interfaces';

export interface ModelFormViewConfig<TModel extends Model, TFormState>{
    entity?: TModel;
    foreigns?: Partial<ModelState>;
    lockedValues?: Partial<TFormState>; 
}