import { MissionChild } from '../interfaces/mission-child.interface';
import { Mission } from './mission.model';

export class MissionImage implements MissionChild{
  constructor(
    public id: number = null,
    public missionId: number = null,
    public fileURL: string,
    public createdAt: Date,
  ){};
  public mission: Mission = undefined;
}
