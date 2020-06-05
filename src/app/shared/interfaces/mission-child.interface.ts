import { Mission } from './models/mission.interface';
import { BaseEntity } from './models/base-entity.interface';

export interface MissionChild extends BaseEntity{
  missionId: number;
  mission: Mission;
}
