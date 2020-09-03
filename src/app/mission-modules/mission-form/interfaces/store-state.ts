import { StateEmployers, StateMissionDocuments, StateMissionImages, StateMissionNotes, StateMissions, StateMissionTypes } from 'src/app/core/state';

export interface StoreState extends 
    StateMissions, 
    StateEmployers,
    StateMissionTypes,
    StateMissionDocuments,
    StateMissionImages,
    StateMissionNotes{} 