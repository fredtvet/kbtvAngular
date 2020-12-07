import { User } from '@core/models';
import { DateParams } from '@shared-app/interfaces';

export interface WeekCriteria extends DateParams{
    year?: number, 
    weekNr?: number, 
    weekDay?: number,
    user?: User
}