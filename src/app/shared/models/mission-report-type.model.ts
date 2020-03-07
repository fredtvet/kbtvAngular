import { BaseEntity } from '../interfaces';

export class MissionReportType implements BaseEntity {
    constructor(
      public id: number = null,
      public name: string  = null,
      ){}
  };
