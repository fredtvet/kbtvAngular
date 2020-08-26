import { StateUserTimesheets, StateMissions } from 'src/app/core/state';

export interface StoreState extends 
    StateUserTimesheets,
    StateMissions {
        userTimesheetListCriteria,
        userTimesheetListGroupBy,
}