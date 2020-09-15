import { StateDocumentTypes, StateEmployers, StateMissionDocuments, StateMissionImages, StateMissionNotes, StateMissions, StateMissionTypes, StateSyncConfig, StateUserTimesheets, StateLastAction, StateCurrentUser } from 'src/app/core/state/interfaces/global.state';
import { SyncStoreTimestamps } from './sync-store-timestamps.interface';
import { SyncStoreConfig } from './sync-store-config.interface';

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
    StateSyncConfig,
    StateCurrentUser
{
    syncConfig: SyncStoreConfig
    syncTimestamps: SyncStoreTimestamps;
}

