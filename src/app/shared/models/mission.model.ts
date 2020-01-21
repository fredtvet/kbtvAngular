export class Mission {
    constructor(
      public id: number = null,
      public phoneNumber: string = null,
      public description: string = null,
      public address: string = null,
      public finished: boolean = null,
      public employerId: number = null,
      public missionTypeId: number = null,
      public employerName: string = null,
      public missionTypeName: string = null
    ){};
  };
