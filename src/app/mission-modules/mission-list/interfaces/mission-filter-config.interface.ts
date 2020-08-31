import { Employer, MissionType, Mission } from 'src/app/core/models';

export interface MissionFilterConfig{
    employers: Employer[];
    missionTypes: MissionType[];
    missions: Mission[];
}