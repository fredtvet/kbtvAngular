import { Model } from '@core/models/base-entity.interface';

export interface ModelFormViewConfig<TModel extends Model, TState, TForm>{
    entity?: TModel;
    foreigns?: Partial<TState>;
    lockedValues?: Partial<TForm>; 
}