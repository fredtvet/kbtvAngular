import { Maybe } from '@global/interfaces';
import { MissionType } from '../mission-type.interface';

export interface MissionTypeForeign {
    missionTypeId?: string;
    missionType?: Maybe<MissionType>;
}