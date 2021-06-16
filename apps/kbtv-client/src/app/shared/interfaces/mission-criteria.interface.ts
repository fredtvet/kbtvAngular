import { Employer, MissionType } from '@core/models';
import { DateRange } from 'date-time-helpers';

export interface MissionCriteria {
    searchString?: string;    
    finished?: boolean; 
    employer?: Employer; 
    missionType?: MissionType;
    dateRange?: DateRange;
}