import { Mission } from '../mission.interface';
import { Model } from '../base-entity.interface';

export interface MissionChild extends Model{
  missionId?: string;
  mission?: Mission;
}
