import { MissionChild } from './mission-child.model';

export class MissionNote extends MissionChild{
    constructor(
      id: number = null,
      missionId: number = null,
      public title: string = null,
      public content: string = null,
      public createdAt: string = null,
      public createdBy: string = null,
      public pinned: boolean = false,
    ){ super(id, missionId)};

  };
