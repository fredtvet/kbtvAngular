
import { FilterViewConfig } from 'src/app/core/services/filter/interfaces';
import { StateUsers, StateMissions } from 'src/app/core/services/state/interfaces';
import { TimesheetCriteria } from '../../interfaces/timesheet-criteria.interface';

export interface TimesheetFilterViewConfig extends FilterViewConfig<TimesheetCriteria>{ 
    state?: StateUsers & StateMissions
}