import { MissionChild } from '../interfaces/mission-child.interface';
import { Mission } from './mission.model';
import { AppFile } from '../interfaces/app-file.interface';

export class MissionImage implements MissionChild, AppFile{
  constructor(
    public id: number = null,
    public missionId: number = null,
    public fileURL: string,
    public createdAt: Date,
  ){};
  public mission: Mission = undefined;
}
