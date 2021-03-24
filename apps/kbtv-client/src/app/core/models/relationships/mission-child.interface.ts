import { Mission } from '../mission.interface';
import { Model } from '../base-entity.interface';
import { Maybe } from 'global-types';

export interface MissionChild extends Model{
  missionId?: string;
  mission?: Maybe<Mission>;
}
