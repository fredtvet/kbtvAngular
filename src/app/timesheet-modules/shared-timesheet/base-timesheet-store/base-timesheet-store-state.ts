import { StateUsers, StateMissions, StateTimesheets } from 'src/app/core/services/state/interfaces';

export interface BaseTimesheetStoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {}