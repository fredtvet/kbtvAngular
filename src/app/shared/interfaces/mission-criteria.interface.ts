import { Employer, MissionType } from 'src/app/core/models';

export interface MissionCriteria {
    searchString?: string;    
    finished?: boolean; 
    employer?: Employer; 
    missionType?: MissionType;
}