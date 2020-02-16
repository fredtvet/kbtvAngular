import { MissionType } from './mission-type.model';
import { Employer } from './employer.model';

export class Mission {
    constructor(
      public id: number = null,
      public phoneNumber: string = null,
      public description: string = null,
      public address: string = null,
      public finished: boolean = false,
      public createdAt: Date = null,
      public employer: Employer = new Employer(),
      public missionType: MissionType = new MissionType(),
    ){};

  };
