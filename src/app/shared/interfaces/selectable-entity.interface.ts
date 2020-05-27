import { BaseEntity } from './base-entity.interface';

export interface SelectableEntity<T extends BaseEntity>{
    entity: T;
    selected: boolean;
}