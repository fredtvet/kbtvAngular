import { StateMissionDocuments, StateEmployers, StateMissions } from '@core/state/global-state.interfaces';

export interface StoreState extends 
    StateMissionDocuments,
    StateEmployers,
    StateMissions {
} 