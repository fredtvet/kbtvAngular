
import { User } from 'src/app/core/models';
import { FilterViewConfig } from 'src/app/core/services/filter/interfaces/filter-view-config.interface';
import { DateParams } from 'src/app/shared-app/interfaces';

export interface WeekFilterViewConfig extends FilterViewConfig<WeekCriteria>{
    users?: User[]
}

export interface WeekCriteria extends DateParams{
    year?: number, 
    weekNr?: number, 
    weekDay?: number,
    userName?: string
}