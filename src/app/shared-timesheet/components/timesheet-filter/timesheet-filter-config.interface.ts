import { TimesheetCriteria } from 'src/app/shared/interfaces';
import { User, Mission } from 'src/app/core/models';

export interface TimesheetFilterConfig{
    filter: TimesheetCriteria, 
    disabledFilters:string[],
    users?: User[], 
    missions?: Mission[]
}