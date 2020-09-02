import { Mission } from './mission.interface';
import { TempEntity } from './temp-entity.interface';

export interface MissionChild extends TempEntity{
  id?: number;
  missionId?: number;
  mission?: Mission;
}
