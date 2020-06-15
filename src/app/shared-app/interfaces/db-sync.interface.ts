import { BaseEntity } from '../../core/models/base-entity.interface';

export interface DbSync<T extends BaseEntity> {
    entities: T[];
    deletedEntities: number[];
    timestamp: number;
};
  