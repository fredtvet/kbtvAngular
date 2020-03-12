import { BaseEntity } from '../interfaces/base-entity.interface';

export class MissionReportType implements BaseEntity {
    constructor(
      public id: number = null,
      public name: string  = null,
      ){}
  };
