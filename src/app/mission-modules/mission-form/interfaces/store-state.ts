import { StateEmployers, StateMissionDocuments, StateMissions, StateMissionTypes, StateMissionImages, StateMissionNotes } from 'src/app/core/state';

export interface StoreState extends 
    StateMissions, 
    StateEmployers,
    StateMissionTypes,
    StateMissionDocuments,
    StateMissionImages,
    StateMissionNotes{} 