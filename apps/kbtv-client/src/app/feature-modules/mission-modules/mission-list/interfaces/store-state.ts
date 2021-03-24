import { StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateCurrentUser } from '@core/state/global-state.interfaces';
import { MissionCriteria } from '@shared/interfaces';

export interface StoreState extends
    StateMissions, 
    StateEmployers,
    StateMissionTypes,
    StateMissionImages,
    StateMissionDocuments,
    StateMissionNotes,
    StateCurrentUser {} 

export interface ComponentStoreState { 
    missionCriteria: MissionCriteria; 
}