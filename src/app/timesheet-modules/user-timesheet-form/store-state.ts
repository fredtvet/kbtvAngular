import { StateUserTimesheets, StateMissions, StateCurrentUser } from 'src/app/core/state';

export interface StoreState extends 
    StateUserTimesheets,
    StateMissions,
    StateCurrentUser {
        userTimesheetFormMissionCriteria: string
}