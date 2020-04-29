import { MissionType } from './mission-type.model';
import { Employer } from './employer.model';
import { BaseEntity } from '../interfaces/base-entity.interface';

export class Mission implements BaseEntity {
    constructor(
      public id: number = null,
      public phoneNumber: string = null,
      public description: string = null,
      public address: string = null,
      public finished: boolean = false,
      public createdAt: Date = null,
      public employerId: number = null,
      public missionTypeId: number = null,
      public employer: Employer = new Employer(),
      public missionType: MissionType = new MissionType(),
    ){};

    public lastVisited: Date;

  };
