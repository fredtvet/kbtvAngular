import { Employer, MissionType } from '@core/models';

export interface MissionCriteria {
    searchString?: string;    
    finished?: boolean; 
    employer?: Employer; 
    missionType?: MissionType;
}