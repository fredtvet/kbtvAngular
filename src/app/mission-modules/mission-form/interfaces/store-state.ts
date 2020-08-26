import { StateEmployers, StateMissionDocuments, StateMissions, StateMissionTypes } from 'src/app/core/state';

export interface StoreState extends 
    StateMissions, 
    StateEmployers,
    StateMissionTypes,
    StateMissionDocuments{} 