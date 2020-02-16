import { BaseEntity } from './base-entity.model';

export abstract class MissionChild extends BaseEntity{
  constructor(
    id: number = null,
    public missionId: number = null
  ){ super(id) };
}
