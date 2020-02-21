import { BaseEntity } from './base-entity.model';

export class MissionReportType extends BaseEntity {
    constructor(
      id: number = null,
      public name: string  = null,
      ){ super(id) }
  };
