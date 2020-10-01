import { Model } from 'src/app/core/models/base-entity.interface';
import { ModelState } from './model-state.interface';

export interface ModelWithRelations<TModel extends Model>{
    entity: TModel;
    foreigns?: Partial<ModelState>;
}