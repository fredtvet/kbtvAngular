import { Timesheet } from 'src/app/core/models';
import { StateMissions, StateUsers, StateTimesheets } from 'src/app/core/state';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { TimesheetCriteria } from 'src/app/shared-app/interfaces';

export interface StoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets{
        timesheetStatisticCriteria: TimesheetCriteria,
        timesheetStatisticGroupBy: GroupByPeriod,
        timesheetStatisticMissionCriteria: string
    }