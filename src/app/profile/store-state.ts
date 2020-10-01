import { StateCurrentUser, StateSyncConfig } from '../core/services/state/interfaces';
import { SyncStoreConfig } from '../core/services/sync/interfaces/sync-store-config.interface';

export interface StoreState extends 
    StateCurrentUser,
    StateSyncConfig {
        syncConfig: SyncStoreConfig
} 