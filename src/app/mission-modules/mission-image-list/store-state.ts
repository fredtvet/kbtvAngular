import { StateMissionImages, StateEmployers, StateMissions } from 'src/app/core/state';

export interface StoreState extends 
    StateMissionImages,
    StateEmployers,
    StateMissions {
} 