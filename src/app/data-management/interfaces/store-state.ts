import { StateMissions, StateDocumentTypes, StateEmployers, StateMissionTypes, StateInboundEmailPassword, StateUsers } from '../../core/state/interfaces/global.state';
import { StateProp } from 'src/app/core/model/state.types';

export interface StoreState extends 
    StateMissions,
    StateDocumentTypes,
    StateEmployers,
    StateMissionTypes,
    StateInboundEmailPassword {
        selectedProperty: StateProp<StoreState>,
    } 