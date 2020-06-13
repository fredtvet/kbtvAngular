import { BaseEntity } from '../../core/models/base-entity.interface';

export interface SelectableEntity<T extends BaseEntity>{
    entity: T;
    selected: boolean;
}