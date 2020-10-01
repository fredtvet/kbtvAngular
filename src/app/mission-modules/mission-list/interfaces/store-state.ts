import { StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, 
    StateMissionDocuments, StateMissionNotes, StateCurrentUser } from 'src/app/core/services/state/interfaces';
import { MissionCriteria } from 'src/app/shared/interfaces';

export interface StoreState extends
    StateMissions, 
    StateEmployers,
    StateMissionTypes,
    StateMissionImages,
    StateMissionDocuments,
    StateMissionNotes,
    StateCurrentUser {
    missionCriteria: MissionCriteria;
} 