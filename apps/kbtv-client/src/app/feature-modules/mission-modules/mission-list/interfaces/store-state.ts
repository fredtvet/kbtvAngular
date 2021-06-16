import { StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateCurrentUser } from '@core/state/global-state.interfaces';
import { MissionCriteria } from '@shared/interfaces';
import { StateSyncConfig } from 'state-sync';

export interface StoreState extends
    StateMissions, 
    StateEmployers,
    StateMissionTypes,
    StateMissionImages,
    StateMissionDocuments,
    StateMissionNotes,
    StateCurrentUser,
    StateSyncConfig {} 

export interface ComponentStoreState { 
    missionCriteria: MissionCriteria; 
}