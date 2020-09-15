import { Model } from '../../models/base-entity.interface';
import { ModelState } from '../model.state';

export interface ModelWithRelations<TModel extends Model>{
    entity: TModel;
    foreigns?: Partial<ModelState>;
}