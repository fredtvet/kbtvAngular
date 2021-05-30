import { StateUsers, StateMissions, StateTimesheets } from '@core/state/global-state.interfaces';
import { GroupByPeriod } from '@shared-app/enums/group-by-period.enum';
import { StateIsFetching } from 'model/state-fetcher';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets,
    StateIsFetching<StateTimesheets>{
        timesheetStatisticTimesheetCriteria: TimesheetCriteria,
        timesheetStatisticGroupBy: GroupByPeriod
}
