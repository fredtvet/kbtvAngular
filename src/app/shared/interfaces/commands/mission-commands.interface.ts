import { Employer } from '../../models/employer.model';
import { MissionType } from '../../models/mission-type.model';

export interface CreateMission extends BaseMission {}

export interface UpdateMission extends BaseMission{
    id: number;
    finished: boolean;
    deleteCurrentImage: boolean;
}

interface BaseMission {
  phoneNumber: string;
  description: string;
  address: string;
  employer: Employer;
  missionType: MissionType;
  image: File;
}
