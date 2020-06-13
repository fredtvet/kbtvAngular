import { Employer } from '../../../core/models/employer.interface';
import { MissionType } from '../../../core/models/mission-type.interface';

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
