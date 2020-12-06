import { StateMissionDocuments, StateDocumentTypes, StateEmployers, StateMissions } from 'src/app/state/interfaces';

export interface StoreState extends 
    StateMissionDocuments,
    StateDocumentTypes,
    StateEmployers,
    StateMissions {
} 