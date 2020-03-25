import { BaseEntity } from './base-entity.interface';
import { Mission } from '../models';

export interface MissionChild extends BaseEntity{
  missionId: number;
  mission: Mission;
}
