import { StateDocumentTypes, StateEmployers, StateMissionDocuments, StateMissionImages, StateMissionNotes, StateMissions, StateMissionTypes, StateSyncConfig, StateUserTimesheets, StateLastAction } from 'src/app/core/state/global.state';
import { SyncStoreTimestamps } from './sync-store-timestamps.interface';

export interface StoreState extends 
    StateLastAction,
    StateMissions, 
    StateMissionTypes,
    StateMissionImages,
    StateMissionDocuments,
    StateMissionNotes,
    StateEmployers,
    StateDocumentTypes,
    StateUserTimesheets,
    StateSyncConfig
    // StateCurrentUser,
    // StateRefreshToken,
    // StateAccessToken  
{
    syncTimestamps: SyncStoreTimestamps;
}

