import { Maybe } from 'global-types';
import { MissionType } from '../mission-type.interface';

export interface MissionTypeForeign {
    missionTypeId?: string;
    missionType?: Maybe<MissionType>;
}