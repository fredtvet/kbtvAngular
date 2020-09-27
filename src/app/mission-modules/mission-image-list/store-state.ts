import { StateEmployers, StateMissionImages, StateMissions } from 'src/app/core/state';

export interface StoreState extends 
    StateMissionImages,
    StateEmployers,
    StateMissions{
} 