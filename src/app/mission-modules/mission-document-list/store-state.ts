import { StateEmployers, StateMissions, StateMissionDocuments, StateDocumentTypes } from 'src/app/core/state';

export interface StoreState extends 
    StateMissionDocuments,
    StateDocumentTypes,
    StateEmployers,
    StateMissions {
} 