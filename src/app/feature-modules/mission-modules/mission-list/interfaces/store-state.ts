import { MissionCriteria } from '@shared/interfaces';
import { StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateCurrentUser } from '@state/interfaces';

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