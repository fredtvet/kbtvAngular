export class MissionNote {
    constructor(
      public id: number = null,
      public title: string = null,
      public content: string = null,
      public createdAt: string = null,
      public createdBy: string = null,
      public pinned: boolean = false
    ){};

  };
