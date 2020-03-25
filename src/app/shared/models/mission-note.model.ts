import { MissionChild } from '../interfaces/mission-child.interface';
import { Mission } from './mission.model';

export class MissionNote implements MissionChild{
    constructor(
      public id: number = null,
      public missionId: number = null,
      public title: string = null,
      public content: string = null,
      public createdAt: string = null,
      public createdBy: string = null,
      public pinned: boolean = false,
    ){};

    public mission: Mission = undefined;
  };
