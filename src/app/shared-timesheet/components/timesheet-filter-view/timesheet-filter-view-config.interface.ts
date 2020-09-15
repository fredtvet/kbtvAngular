import { FilterViewConfig } from 'src/app/core/filter/interfaces/filter-view-config.interface';
import { StateMissions, StateUsers } from 'src/app/core/state';
import { TimesheetCriteria } from '../../interfaces/timesheet-criteria.interface';

export interface TimesheetFilterViewConfig extends FilterViewConfig<TimesheetCriteria>{ 
    state?: StateUsers & StateMissions
}