import { StateMissionDocuments, StateDocumentTypes, StateEmployers, StateMissions } from 'src/app/core/services/state/interfaces';

export interface StoreState extends 
    StateMissionDocuments,
    StateDocumentTypes,
    StateEmployers,
    StateMissions {
} 