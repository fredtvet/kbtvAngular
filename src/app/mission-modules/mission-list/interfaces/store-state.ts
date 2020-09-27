import { StateCurrentUser, StateEmployers, StateMissionDocuments, StateMissionImages, StateMissionNotes, StateMissions, StateMissionTypes } from 'src/app/core/state';
import { MissionCriteria } from '../../../shared/interfaces/mission-filter-criteria.interface';

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