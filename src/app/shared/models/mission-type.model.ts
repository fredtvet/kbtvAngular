import { BaseEntity } from './base-entity.model';

export class MissionType extends BaseEntity {
    constructor(
      id: number = null,
      public name: string  = null,
      ){ super(id) }
  };
