import { StateMissionDocuments, StateDocumentTypes, StateEmployers, StateMissions } from '@core/state/global-state.interfaces';

export interface StoreState extends 
    StateMissionDocuments,
    StateDocumentTypes,
    StateEmployers,
    StateMissions {
} 