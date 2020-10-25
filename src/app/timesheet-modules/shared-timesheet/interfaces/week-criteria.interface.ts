import { User } from 'src/app/core/models';
import { DateParams } from 'src/app/shared-app/interfaces';

export interface WeekCriteria extends DateParams{
    year?: number, 
    weekNr?: number, 
    weekDay?: number,
    user?: User
}