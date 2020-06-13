import { Mission } from './mission.interface';
import { BaseEntity } from './base-entity.interface';

export interface MissionChild extends BaseEntity{
  missionId: number;
  mission: Mission;
}
