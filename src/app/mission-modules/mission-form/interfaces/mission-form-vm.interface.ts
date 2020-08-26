import { MissionType, Employer, Mission } from 'src/app/core/models';

export interface MissionFormVm{
    mission: Mission;
    missionTypes: MissionType[];
    employers: Employer[];
}