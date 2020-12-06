import { SyncConfig } from '../core/services/sync/interfaces';
import { StateCurrentUser, StateSyncConfig } from '../state/interfaces';

export interface StoreState extends 
    StateCurrentUser,
    StateSyncConfig {
        syncConfig: SyncConfig
} 