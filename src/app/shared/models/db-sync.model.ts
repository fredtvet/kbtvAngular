import { BaseEntity } from './base-entity.model';

export class DbSync<T extends BaseEntity> {
  constructor(
    public entities: T[] = [],
    public deletedEntities: number[] = [],
    public timestamp: Date = null
  ){ }

  };
