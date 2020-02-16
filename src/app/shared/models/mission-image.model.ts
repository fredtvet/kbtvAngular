import { MissionChild } from './mission-child.model';

export class MissionImage extends MissionChild{
  constructor(
    id: number = null,
    missionId: number = null,
    public fileURL: string,
    public createdAt: Date,
  ){ super(id, missionId)};
}
