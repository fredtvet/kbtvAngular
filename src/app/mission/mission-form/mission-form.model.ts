import {Employer, MissionType, Mission} from 'src/app/shared';

export class MissionForm{
    constructor(
      public mission: Mission,
      public isCreateForm: boolean = false
    ){}
}
