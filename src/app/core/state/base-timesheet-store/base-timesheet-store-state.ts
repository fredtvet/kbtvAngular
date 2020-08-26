import { StateUsers, StateMissions, StateTimesheets } from '../global.state';

export interface BaseTimesheetStoreState extends 
    StateUsers,
    StateMissions,
    StateTimesheets {}