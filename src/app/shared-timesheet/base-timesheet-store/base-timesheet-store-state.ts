import { StateUsers, StateMissions, StateTimesheets } from 'src/app/core/state';

export interface BaseTimesheetStoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {}