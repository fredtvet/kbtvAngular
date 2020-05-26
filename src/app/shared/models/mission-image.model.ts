import { MissionChild } from '../interfaces/mission-child.interface';
import { Mission } from './mission.model';
import { AppImage } from '../interfaces/app-image.interface';

export class MissionImage implements MissionChild, AppImage{
  constructor(
    public id: number = null,
    public missionId: number = null,
    public fileURL: string,
    public createdAt: Date,
  ){};
  public mission: Mission = undefined;
}
