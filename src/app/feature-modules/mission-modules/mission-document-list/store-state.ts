import { StateMissionDocuments, StateDocumentTypes, StateEmployers, StateMissions } from '@state/interfaces';

export interface StoreState extends 
    StateMissionDocuments,
    StateDocumentTypes,
    StateEmployers,
    StateMissions {
} 