import { BaseEntity } from '../interfaces/base-entity.interface';

export class DbSync<T extends BaseEntity> {
  constructor(
    public entities: T[] = [],
    public deletedEntities: number[] = [],
    public timestamp: Date = null
  ){ }

  };
