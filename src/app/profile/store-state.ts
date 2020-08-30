import { StateSyncConfig, StateCurrentUser } from 'src/app/core/state';
import { SyncStoreConfig } from '../core/services/sync/interfaces/sync-store-config.interface';

export interface StoreState extends 
    StateCurrentUser,
    StateSyncConfig {
        syncConfig: SyncStoreConfig
} 