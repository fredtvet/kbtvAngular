import { BaseEntity } from './models/base-entity.interface';

export interface SelectableEntity<T extends BaseEntity>{
    entity: T;
    selected: boolean;
}