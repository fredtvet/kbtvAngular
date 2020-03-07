import { MissionChild } from '../interfaces';

export class MissionImage implements MissionChild{
  constructor(
    public id: number = null,
    public missionId: number = null,
    public fileURL: string,
    public createdAt: Date,
  ){};
}
