import { StateMissions, StateDocumentTypes, StateEmployers, StateMissionTypes, StateInboundEmailPassword, StateUsers } from '../core/state/global.state';

export interface StoreState extends 
    StateMissions,
    StateDocumentTypes,
    StateEmployers,
    StateMissionTypes,
    StateInboundEmailPassword {
        selectedProperty: Extract<keyof StoreState, string>,
    } 