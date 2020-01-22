import {Employer, MissionType, Mission} from 'src/app/shared';

export class MissionForm{
    constructor(
      public mission: Mission,
      public missionTypes: MissionType[],
      public employers: Employer[],
      public isCreateForm: boolean = false
    ){}
}
