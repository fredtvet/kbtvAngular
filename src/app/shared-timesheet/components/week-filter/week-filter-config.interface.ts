import { User } from 'src/app/core/models';
import { DateParams } from 'src/app/shared-app/interfaces';

export interface WeekFilterConfig{
    filter: WeekFilterCriteria, 
    disabledFilters:string[],
    users?: User[]
}

export interface WeekFilterCriteria extends DateParams{
    year?: number, 
    weekNr?: number, 
    weekDay?: number,
    userName?: string
}